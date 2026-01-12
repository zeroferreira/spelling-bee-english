import React, { useState, useEffect } from 'react';
import { Play, Book, Info, ArrowLeft, Shuffle, RotateCcw, Volume2 } from 'lucide-react';

const SpellingBeeGame = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [usedWords, setUsedWords] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Palabras del Level A con fonética
  const levelAWords = [
    { word: 'accountant', phonetic: '/əˈkaʊntənt/' },
    { word: 'advertisement', phonetic: '/ədˈvɜːtɪsmənt/' },
    { word: 'advice', phonetic: '/ədˈvaɪs/' },
    { word: 'alright', phonetic: '/ɔːlˈraɪt/' },
    { word: 'amazing', phonetic: '/əˈmeɪzɪŋ/' },
    { word: 'apartment', phonetic: '/əˈpɑːtmənt/' },
    { word: 'Argentina', phonetic: '/ˌɑːdʒənˈtiːnə/' },
    { word: 'armchair', phonetic: '/ˈɑːmtʃeə/' },
    { word: 'article', phonetic: '/ˈɑːtɪkəl/' },
    { word: 'attic', phonetic: '/ˈætɪk/' },
    { word: 'autumn', phonetic: '/ˈɔːtəm/' },
    { word: 'awful', phonetic: '/ˈɔːfəl/' },
    { word: 'backpack', phonetic: '/ˈbækpæk/' },
    { word: 'balloon', phonetic: '/bəˈluːn/' },
    { word: 'basketball', phonetic: '/ˈbæskɪtbɔːl/' },
    { word: 'bathroom', phonetic: '/ˈbæθruːm/' },
    { word: 'beard', phonetic: '/bɪəd/' },
    { word: 'beautiful', phonetic: '/ˈbjuːtɪfəl/' },
    { word: 'bedroom', phonetic: '/ˈbedruːm/' },
    { word: 'belt', phonetic: '/belt/' },
    { word: 'bicycle', phonetic: '/ˈbaɪsɪkəl/' },
    { word: 'biology', phonetic: '/baɪˈɒlədʒi/' },
    { word: 'biscuits', phonetic: '/ˈbɪskɪts/' },
    { word: 'black', phonetic: '/blæk/' },
    { word: 'blonde', phonetic: '/blɒnd/' },
    { word: 'blue', phonetic: '/bluː/' },
    { word: 'book', phonetic: '/bʊk/' },
    { word: 'bookcase', phonetic: '/ˈbʊkkeɪs/' },
    { word: 'boring', phonetic: '/ˈbɔːrɪŋ/' },
    { word: 'bracelet', phonetic: '/ˈbreɪslət/' },
    { word: 'Brazil', phonetic: '/brəˈzɪl/' },
    { word: 'breakfast', phonetic: '/ˈbrekfəst/' },
    { word: 'bridge', phonetic: '/brɪdʒ/' },
    { word: 'brilliant', phonetic: '/ˈbrɪljənt/' },
    { word: 'brother', phonetic: '/ˈbrʌðə/' },
    { word: 'builder', phonetic: '/ˈbɪldə/' },
    { word: 'burger', phonetic: '/ˈbɜːɡə/' },
    { word: 'butter', phonetic: '/ˈbʌtə/' },
    { word: 'cabbage', phonetic: '/ˈkæbɪdʒ/' },
    { word: 'camel', phonetic: '/ˈkæməl/' },
    { word: 'camera', phonetic: '/ˈkæmərə/' },
    { word: 'carpet', phonetic: '/ˈkɑːpɪt/' },
    { word: 'castle', phonetic: '/ˈkɑːsəl/' },
    { word: 'cathedral', phonetic: '/kəˈθiːdrəl/' },
    { word: 'chair', phonetic: '/tʃeə/' },
    { word: 'cheerful', phonetic: '/ˈtʃɪəfəl/' },
    { word: 'cheese', phonetic: '/tʃiːz/' },
    { word: 'chef', phonetic: '/ʃef/' },
    { word: 'chemistry', phonetic: '/ˈkemɪstri/' },
    { word: 'chess', phonetic: '/tʃes/' },
    { word: 'chicken', phonetic: '/ˈtʃɪkɪn/' },
    { word: 'children', phonetic: '/ˈtʃɪldrən/' },
    { word: 'Chinese', phonetic: '/ˌtʃaɪˈniːz/' },
    { word: 'chocolate', phonetic: '/ˈtʃɒklət/' },
    { word: 'classical', phonetic: '/ˈklæsɪkəl/' },
    { word: 'coach', phonetic: '/kəʊtʃ/' },
    { word: 'coffee', phonetic: '/ˈkɒfi/' },
    { word: 'comfortable', phonetic: '/ˈkʌmftəbəl/' },
    { word: 'computer', phonetic: '/kəmˈpjuːtə/' },
    { word: 'cooker', phonetic: '/ˈkʊkə/' },
    { word: 'costumes', phonetic: '/ˈkɒstjuːmz/' },
    { word: 'cousins', phonetic: '/ˈkʌzənz/' },
    { word: 'crocodile', phonetic: '/ˈkrɒkədaɪl/' },
    { word: 'crossroad', phonetic: '/ˈkrɒsrəʊd/' },
    { word: 'crowded', phonetic: '/ˈkraʊdɪd/' },
    { word: 'crowds', phonetic: '/kraʊdz/' },
    { word: 'cucumber', phonetic: '/ˈkjuːkʌmbə/' },
    { word: 'cupboard', phonetic: '/ˈkʌbəd/' },
    { word: 'curtain', phonetic: '/ˈkɜːtən/' },
    { word: 'dancers', phonetic: '/ˈdænsəz/' },
    { word: 'dangerous', phonetic: '/ˈdeɪndʒərəs/' },
    { word: 'daughter', phonetic: '/ˈdɔːtə/' },
    { word: 'dentist', phonetic: '/ˈdentɪst/' },
    { word: 'desk', phonetic: '/desk/' },
    { word: 'dessert', phonetic: '/dɪˈzɜːt/' },
    { word: 'dictionary', phonetic: '/ˈdɪkʃənəri/' },
    { word: 'difficult', phonetic: '/ˈdɪfɪkəlt/' },
    { word: 'dirty', phonetic: '/ˈdɜːti/' },
    { word: 'dishwasher', phonetic: '/ˈdɪʃwɒʃə/' },
    { word: 'download', phonetic: '/ˌdaʊnˈləʊd/' },
    { word: 'drums', phonetic: '/drʌmz/' },
    { word: 'earphones', phonetic: '/ˈɪəfəʊnz/' },
    { word: 'earrings', phonetic: '/ˈɪərɪŋz/' },
    { word: 'easy', phonetic: '/ˈiːzi/' },
    { word: 'eggs', phonetic: '/eɡz/' },
    { word: 'eight', phonetic: '/eɪt/' },
    { word: 'eighty', phonetic: '/ˈeɪti/' },
    { word: 'elderly', phonetic: '/ˈeldəli/' },
    { word: 'electrician', phonetic: '/ɪˌlekˈtrɪʃən/' },
    { word: 'empty', phonetic: '/ˈempti/' },
    { word: 'evening', phonetic: '/ˈiːvnɪŋ/' },
    { word: 'exhibition', phonetic: '/ˌeksɪˈbɪʃən/' },
    { word: 'expensive', phonetic: '/ɪkˈspensɪv/' },
    { word: 'factory', phonetic: '/ˈfæktəri/' },
    { word: 'fast', phonetic: '/fæst/' },
    { word: 'father', phonetic: '/ˈfɑːðə/' },
    { word: 'fireworks', phonetic: '/ˈfaɪəwɜːks/' },
    { word: 'foggy', phonetic: '/ˈfɒɡi/' },
    { word: 'football', phonetic: '/ˈfʊtbɔːl/' },
    { word: 'freezer', phonetic: '/ˈfriːzə/' },
    { word: 'Friday', phonetic: '/ˈfraɪdeɪ/' },
    { word: 'fridge', phonetic: '/frɪdʒ/' },
    { word: 'friendly', phonetic: '/ˈfrendli/' },
    { word: 'frog', phonetic: '/frɒɡ/' },
    { word: 'garage', phonetic: '/ˈɡærɑːʒ/' },
    { word: 'garden', phonetic: '/ˈɡɑːdən/' },
    { word: 'generous', phonetic: '/ˈdʒenərəs/' },
    { word: 'Geography', phonetic: '/dʒiˈɒɡrəfi/' },
    { word: 'Germany', phonetic: '/ˈdʒɜːməni/' },
    { word: 'glasses', phonetic: '/ˈɡlæsɪz/' },
    { word: 'goodbye', phonetic: '/ɡʊdˈbaɪ/' },
    { word: 'grandmother', phonetic: '/ˈɡrænmʌðə/' },
    { word: 'grapes', phonetic: '/ɡreɪps/' },
    { word: 'great', phonetic: '/ɡreɪt/' },
    { word: 'green', phonetic: '/ɡriːn/' },
    { word: 'grey', phonetic: '/ɡreɪ/' },
    { word: 'gymnastics', phonetic: '/dʒɪmˈnæstɪks/' },
    { word: 'coffee', phonetic: '/ˈkɒfi/' }
  ];

  const levels = {
    'A': {
      name: 'Level A',
      sublevels: ['A1', 'A2', 'KET'],
      words: levelAWords,
      color: '#FFD700'
    },
    'B': {
      name: 'Level B',
      sublevels: ['B1', 'B1+', 'PET'],
      words: [],
      color: '#FFA500'
    },
    'C': {
      name: 'Level C',
      sublevels: ['B2', 'C1', 'C2', 'FC', 'CAE'],
      words: [],
      color: '#FF8C00'
    }
  };

  const selectRandomWord = () => {
    if (!selectedLevel || !levels[selectedLevel].words.length) return;
    
    const availableWords = levels[selectedLevel].words.filter(
      word => !usedWords.includes(word.word)
    );
    
    if (availableWords.length === 0) {
      alert('¡Todas las palabras han sido utilizadas! El juego se reiniciará.');
      setUsedWords([]);
      return;
    }
    
    setIsSpinning(true);
    setAnimationStep(0);
    
    const numbers = Array.from({length: 10}, (_, i) => i + 1);
    let currentIndex = 0;
    
    const numberInterval = setInterval(() => {
      setAnimationStep(numbers[currentIndex]);
      currentIndex = (currentIndex + 1) % numbers.length;
    }, 100);
    
    setTimeout(() => {
      clearInterval(numberInterval);
      const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      setCurrentWord(randomWord);
      setUsedWords(prev => [...prev, randomWord.word]);
      setIsSpinning(false);
      setAnimationStep(0);
    }, 2000);
  };

  const resetGame = () => {
    setUsedWords([]);
    setCurrentWord(null);
    setAnimationStep(0);
  };

  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-400 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12 animate-pulse">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-black rounded-full w-32 h-32 mx-auto blur-lg opacity-30"></div>
          <div className="relative bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full w-32 h-32 mx-auto flex items-center justify-center border-4 border-black shadow-2xl">
            <div className="text-4xl">🐝</div>
          </div>
        </div>
        <h1 className="text-6xl font-bold text-black mb-4 tracking-wide">
          SPELLING
        </h1>
        <h2 className="text-8xl font-bold text-black mb-4 tracking-wider">
          BEE
        </h2>
        <p className="text-2xl text-black font-semibold">
          ¡Bienvenido al juego más divertido!
        </p>
      </div>
      
      <div className="space-y-6 w-full max-w-md">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="w-full bg-black text-yellow-400 py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-yellow-600 hover:text-black hover:scale-105 shadow-lg transform hover:shadow-2xl flex items-center justify-center gap-3"
        >
          <Play className="w-6 h-6" />
          Iniciar Concurso
        </button>
        
        <button
          onClick={() => setCurrentScreen('menu')}
          className="w-full bg-white text-black py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-amber-200 hover:scale-105 shadow-lg transform hover:shadow-2xl flex items-center justify-center gap-3"
        >
          <Book className="w-6 h-6" />
          Iniciar Entrenamiento
        </button>
        
        <button
          onClick={() => setCurrentScreen('instructions')}
          className="w-full bg-amber-600 text-white py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-amber-700 hover:scale-105 shadow-lg transform hover:shadow-2xl flex items-center justify-center gap-3"
        >
          <Info className="w-6 h-6" />
          Instrucciones
        </button>
      </div>
    </div>
  );

  const MenuScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-400 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-black text-yellow-400 p-3 rounded-full hover:bg-yellow-600 hover:text-black transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold text-black">Selecciona tu Nivel</h1>
          <div className="w-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(levels).map(([key, level]) => (
            <div key={key} className="relative">
              <div className="bg-gradient-to-br from-amber-300 to-amber-500 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-black">
                <div className="text-center mb-6">
                  <div className="bg-black text-yellow-400 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 shadow-lg">
                    <span className="text-2xl font-bold">{key}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-black mb-2">{level.name}</h2>
                  <div className="flex flex-wrap justify-center gap-2">
                    {level.sublevels.map((sublevel, index) => (
                      <span key={index} className="bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {sublevel}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setSelectedLevel(key);
                      setGameMode('contest');
                      setCurrentScreen('game');
                    }}
                    className="w-full bg-black text-yellow-400 py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:bg-yellow-600 hover:text-black shadow-lg"
                    disabled={level.words.length === 0}
                  >
                    {level.words.length > 0 ? 'Contest' : 'Coming Soon'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setSelectedLevel(key);
                      setGameMode('training');
                      setCurrentScreen('game');
                    }}
                    className="w-full bg-white text-black py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:bg-amber-200 shadow-lg"
                    disabled={level.words.length === 0}
                  >
                    {level.words.length > 0 ? 'Training' : 'Coming Soon'}
                  </button>
                </div>
                
                <div className="mt-4 text-center">
                  <span className="text-black font-semibold">
                    {level.words.length} palabras disponibles
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GameScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-400 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentScreen('menu')}
            className="bg-black text-yellow-400 p-3 rounded-full hover:bg-yellow-600 hover:text-black transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black">
              {levels[selectedLevel]?.name} - {gameMode === 'contest' ? 'Contest' : 'Training'}
            </h1>
            <p className="text-black font-semibold">
              Palabras usadas: {usedWords.length} / {levels[selectedLevel]?.words.length}
            </p>
          </div>
          <button
            onClick={resetGame}
            className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-all duration-300 shadow-lg"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-12 shadow-2xl border-4 border-black max-w-2xl mx-auto">
            {isSpinning ? (
              <div className="animate-spin text-6xl font-bold text-black mb-8">
                {animationStep || '🎲'}
              </div>
            ) : currentWord ? (
              <div className="space-y-6">
                <div className="text-5xl font-bold text-black mb-4">
                  {currentWord.word}
                </div>
                <div className="text-2xl text-gray-600 font-mono">
                  {currentWord.phonetic}
                </div>
                <button
                  onClick={() => {
                    if ('speechSynthesis' in window) {
                      const utterance = new SpeechSynthesisUtterance(currentWord.word);
                      utterance.lang = 'en-US';
                      speechSynthesis.speak(utterance);
                    }
                  }}
                  className="bg-amber-600 text-white p-3 rounded-full hover:bg-amber-700 transition-all duration-300 shadow-lg"
                >
                  <Volume2 className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="text-2xl text-gray-600 font-semibold">
                Presiona "Selección de Palabra" para comenzar
              </div>
            )}
          </div>
          
          <div className="mt-8 space-y-4">
            <button
              onClick={selectRandomWord}
              className="bg-black text-yellow-400 py-4 px-8 rounded-xl font-bold text-xl transition-all duration-300 hover:bg-yellow-600 hover:text-black shadow-lg transform hover:scale-105 flex items-center justify-center gap-3 mx-auto"
              disabled={isSpinning}
            >
              <Shuffle className="w-6 h-6" />
              {isSpinning ? 'Selecting...' : 'Word Selection'}
            </button>
            
            {currentWord && (
              <button
                onClick={selectRandomWord}
                className="bg-white text-black py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:bg-amber-200 shadow-lg transform hover:scale-105 mx-auto block"
                disabled={isSpinning}
              >
                Seleccionar Nueva Palabra
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const InstructionsScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-amber-400 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="bg-black text-yellow-400 p-3 rounded-full hover:bg-yellow-600 hover:text-black transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold text-black">Instrucciones</h1>
          <div className="w-12"></div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-black">
          <div className="space-y-6 text-black">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-amber-600">🎯 Objetivo del Juego</h2>
              <p className="text-lg">
                Spelling Bee es un juego donde debes deletrear correctamente las palabras en inglés. 
                Cada palabra viene con su pronunciación fonética para ayudarte a aprenderla mejor.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-amber-600">📚 Niveles Disponibles</h2>
              <ul className="space-y-2 text-lg">
                <li><strong>Level A:</strong> A1, A2, KET - Palabras básicas</li>
                <li><strong>Level B:</strong> B1, B1+, PET - Palabras intermedias</li>
                <li><strong>Level C:</strong> B2, C1, C2, FC, CAE - Palabras avanzadas</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-amber-600">🎮 Modos de Juego</h2>
              <ul className="space-y-2 text-lg">
                <li><strong>Concurso:</strong> Juega contra el tiempo con palabras aleatorias</li>
                <li><strong>Entrenamiento:</strong> Practica sin presión de tiempo</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-amber-600">🎲 Cómo Jugar</h2>
              <ol className="space-y-2 text-lg list-decimal list-inside">
                <li>Selecciona tu nivel de dificultad</li>
                <li>Elige entre Concurso o Entrenamiento</li>
                <li>Presiona "Selección de Palabra" para obtener una palabra aleatoria</li>
                <li>Escucha la pronunciación y observa la fonética</li>
                <li>Deletrea la palabra correctamente</li>
                <li>Continúa con nuevas palabras</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3 text-amber-600">🔧 Características</h2>
              <ul className="space-y-2 text-lg">
                <li>• Pronunciación de audio para cada palabra</li>
                <li>• Notación fonética internacional</li>
                <li>• Sistema de palabras no repetidas</li>
                <li>• Contador de progreso</li>
                <li>• Interfaz moderna y amigable</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'menu' && <MenuScreen />}
      {currentScreen === 'game' && <GameScreen />}
      {currentScreen === 'instructions' && <InstructionsScreen />}
    </div>
  );
};

export default SpellingBeeGame;