import { useState, useCallback } from 'react';
import {
  INITIAL_NODE_ID,
  getCaseById,
  ALL_CASES,
} from '../data/mysteryStory.js';
import {
  saveGameState,
  loadGameState,
  clearGameState,
  hasSavedGame as checkHasSavedGame,
} from '../utils/storage.js';

export function useGame() {
  const [activeCaseId, setActiveCaseId] = useState('case_red_seal');
  const [currentNodeId, setCurrentNodeId] = useState(INITIAL_NODE_ID);
  const [collectedClueIds, setCollectedClueIds] = useState([]);
  const [decisionHistory, setDecisionHistory] = useState([]);
  const [gameStatus, setGameStatus] = useState('idle'); // 'idle' | 'playing' | 'ended' | 'error'
  const [currentEnding, setCurrentEnding] = useState(null);
  const [isCaseFileOpen, setIsCaseFileOpen] = useState(false);
  const [newlyUnlockedClues, setNewlyUnlockedClues] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasSave, setHasSave] = useState(() => checkHasSavedGame());

  const activeCase = getCaseById(activeCaseId);

  // Vaka seçimi
  const selectCase = useCallback((caseId) => {
    const selected = getCaseById(caseId);
    setActiveCaseId(selected.id);
    setCurrentNodeId(selected.initialNodeId);
    setCollectedClueIds([]);
    setDecisionHistory([]);
    setCurrentEnding(null);
    setErrorMessage(null);
  }, []);

  // Yeni bir oyun başlatır
  const startNewGame = useCallback((chosenCaseId) => {
    const targetCaseId = chosenCaseId || activeCaseId;
    const targetCase = getCaseById(targetCaseId);
    setActiveCaseId(targetCase.id);

    const initialNode = targetCase.nodes[targetCase.initialNodeId];
    const initialClues = initialNode && Array.isArray(initialNode.clues) ? initialNode.clues : [];

    const newState = {
      activeCaseId: targetCase.id,
      currentNodeId: targetCase.initialNodeId,
      collectedClueIds: initialClues,
      decisionHistory: [],
      gameStatus: 'playing',
      currentEnding: null,
    };

    setCurrentNodeId(targetCase.initialNodeId);
    setCollectedClueIds(initialClues);
    setDecisionHistory([]);
    setGameStatus('playing');
    setCurrentEnding(null);
    setErrorMessage(null);
    setIsCaseFileOpen(false);
    setNewlyUnlockedClues(initialClues);

    saveGameState(newState);
    setHasSave(true);
  }, [activeCaseId]);

  // Kayıtlı oyunu yükler
  const resumeGame = useCallback(() => {
    const saved = loadGameState();
    if (!saved || !saved.currentNodeId) {
      startNewGame();
      return false;
    }

    const savedCaseId = saved.activeCaseId || 'case_red_seal';
    const targetCase = getCaseById(savedCaseId);
    setActiveCaseId(targetCase.id);

    // Hedef düğümün varlığını doğrula
    let validNodeId = saved.currentNodeId;
    if (!targetCase.nodes[validNodeId] && !validNodeId.startsWith('node_final_') && !validNodeId.includes('_final_')) {
      validNodeId = targetCase.initialNodeId;
    }

    setCurrentNodeId(validNodeId);
    setCollectedClueIds(saved.collectedClueIds || []);
    setDecisionHistory(saved.decisionHistory || []);
    setGameStatus(saved.gameStatus || 'playing');
    setCurrentEnding(saved.currentEnding || null);
    setErrorMessage(null);
    setNewlyUnlockedClues([]);
    setIsCaseFileOpen(false);
    return true;
  }, [startNewGame]);

  // Karar verme ve bir sonraki düğüme geçiş
  const makeChoice = useCallback(
    (choice) => {
      if (!choice || !choice.nextNodeId) {
        setErrorMessage('Seçim hedefi tanımlı değil.');
        return;
      }

      // Kilitli seçenek kontrolü (gerekli ipucu eksikse)
      if (Array.isArray(choice.requiredClueIds) && choice.requiredClueIds.length > 0) {
        const hasAllClues = choice.requiredClueIds.every((id) =>
          collectedClueIds.includes(id)
        );
        if (!hasAllClues) {
          setErrorMessage('Bu seçeneği seçmek için gerekli ipuçlarına henüz sahip değilsiniz.');
          return;
        }
      }

      const nextNodeId = choice.nextNodeId;
      const newDecision = {
        choiceId: choice.id,
        text: choice.text,
        fromNodeId: currentNodeId,
        toNodeId: nextNodeId,
        decisionTag: choice.decisionTag || '',
        timestamp: new Date().toISOString(),
      };

      const updatedHistory = [...decisionHistory, newDecision];
      setDecisionHistory(updatedHistory);

      // Final düğümüne mi ulaşıldı?
      if (nextNodeId.startsWith('node_final_') || nextNodeId.includes('_final_')) {
        const evaluatedEnding = activeCase.evaluateEnding(nextNodeId, collectedClueIds, updatedHistory);
        setCurrentNodeId(nextNodeId);
        setCurrentEnding(evaluatedEnding);
        setGameStatus('ended');
        setNewlyUnlockedClues([]);

        saveGameState({
          activeCaseId: activeCase.id,
          currentNodeId: nextNodeId,
          collectedClueIds,
          decisionHistory: updatedHistory,
          gameStatus: 'ended',
          currentEnding: evaluatedEnding,
        });
        return;
      }

      // Normal düğüm geçişi
      const nextNode = activeCase.nodes[nextNodeId];
      if (!nextNode) {
        setErrorMessage(`Aradığınız sahneye (${nextNodeId}) ulaşılamadı. Lütfen menüye dönün.`);
        setGameStatus('error');
        return;
      }

      // Yeni ipuçlarını topla (çift kayıt olmasını engelle)
      let newlyFound = [];
      let updatedClues = [...collectedClueIds];

      if (Array.isArray(nextNode.clues) && nextNode.clues.length > 0) {
        for (const clueId of nextNode.clues) {
          if (!updatedClues.includes(clueId)) {
            updatedClues.push(clueId);
            newlyFound.push(clueId);
          }
        }
      }

      setCurrentNodeId(nextNodeId);
      setCollectedClueIds(updatedClues);
      setNewlyUnlockedClues(newlyFound);
      setErrorMessage(null);

      // Kaydet
      saveGameState({
        activeCaseId: activeCase.id,
        currentNodeId: nextNodeId,
        collectedClueIds: updatedClues,
        decisionHistory: updatedHistory,
        gameStatus: 'playing',
        currentEnding: null,
      });
      setHasSave(true);
    },
    [activeCase, collectedClueIds, currentNodeId, decisionHistory]
  );

  // Oyunu sıfırlar ve ana menüye döner
  const resetGame = useCallback(() => {
    clearGameState();
    const currentCase = getCaseById(activeCaseId);
    setCurrentNodeId(currentCase.initialNodeId);
    setCollectedClueIds([]);
    setDecisionHistory([]);
    setGameStatus('idle');
    setCurrentEnding(null);
    setNewlyUnlockedClues([]);
    setErrorMessage(null);
    setIsCaseFileOpen(false);
    setHasSave(false);
  }, [activeCaseId]);

  // Ana menüye dönüş (oyun durumunu sıfırlamadan kaydeder)
  const returnToMenu = useCallback(() => {
    setGameStatus('idle');
    setIsCaseFileOpen(false);
    setHasSave(checkHasSavedGame());
  }, []);

  // Vaka dosyasını açıp kapatma
  const toggleCaseFile = useCallback((open) => {
    setIsCaseFileOpen((prev) => (typeof open === 'boolean' ? open : !prev));
  }, []);

  // Yeni ipucu bildirimini kapatma
  const dismissNewClues = useCallback(() => {
    setNewlyUnlockedClues([]);
  }, []);

  const currentNode = activeCase.nodes[currentNodeId] || null;

  return {
    activeCaseId,
    activeCase,
    allCases: ALL_CASES,
    currentNodeId,
    currentNode,
    collectedClueIds,
    decisionHistory,
    gameStatus,
    currentEnding,
    isCaseFileOpen,
    newlyUnlockedClues,
    errorMessage,
    hasSave,
    selectCase,
    startNewGame,
    resumeGame,
    makeChoice,
    resetGame,
    returnToMenu,
    toggleCaseFile,
    dismissNewClues,
  };
}
