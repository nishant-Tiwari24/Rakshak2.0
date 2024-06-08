import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import Button from './Button';
import { curve } from '../assets';
import { AiOutlineAudio } from 'react-icons/ai'; // Import the AiOutlineAudio icon from react-icons

const MicListener = () => {
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [commandDetected, setCommandDetected] = useState(false); // Track if command has been detected
  const navigate = useNavigate();

  useEffect(() => {
    let recognition = null;

    const startRecognition = () => {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage('');
        console.log('Recognition started');
      };

      recognition.onresult = (event) => {
        if (!commandDetected) { // Check if command has already been detected
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

          console.log('Transcript:', transcript);

          if (transcript.toLowerCase().includes('emergency emergency')) {
            recognition.stop();
            setCommandDetected(true); // Set command detected
            speakResponse("Your ambulance is on the way.");
            navigate('/sosreq');
            console.log('Detected emergency command');
          } else {
            
            // speakResponse("I hope you are safe, but if you are facing any medical emergency problem, please speak 'emergency emergency'.");
          }
        }
      };

      recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
        if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Please try again.');
          setTimeout(() => {
            startRecognition();
          }, 1000);
        } else {
          setErrorMessage('Error occurred in recognition: ' + event.error);
          recognition.stop();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('Recognition ended');
      };

      recognition.start();
    };

    const speakResponse = (text) => {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    };

    if (isListening) {
      startRecognition();
    }

    return () => {
      if (recognition) {
        recognition.stop();
        console.log('Recognition stopped');
      }
    };
  }, [isListening, navigate, commandDetected]); // Include commandDetected in dependencies

  const handleToggleListening = () => {
    setIsListening(!isListening);
    setCommandDetected(false); // Reset command detection when toggling listening
  };

  return (
    <Section className="pt-[12rem] -mt-[5.25rem] h-screen" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="hero">
      <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-12 lg:mb-[0.25rem]">
        <h1 className="h1 mb-6">
          Securing Medical Emergency by Booking an{' '}
          <span className="inline-block relative">
            Ambulance{' '}
            <img src={curve} className="absolute top-full left-0 w-full xl:-mt-2" width={624} height={28} alt="Curve" />
          </span>
        </h1>
        <p className="body-1 max-w-3xl mx-auto text-n-2 lg:mb-8">
          In urgent medical situations, swiftly book emergency services.
        </p>
      </div>
      <div className={`p-6 rounded-lg shadow-lg text-center ${isListening && 'animate-glow'}`}>
        <div className="flex items-center justify-center mb-4">
          <AiOutlineAudio className="w-8 h-8 mr-2" /> {/* AiOutlineAudio is the microphone icon */}
          <button onClick={handleToggleListening} className="bg-red-500 text-white px-8 py-4 text-xl rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            {isListening ? 'Stop Listening' : 'Speak: emergency emergency'}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </Section>
  );
};

export default MicListener;
