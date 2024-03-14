import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {useEffect, useState} from "react";
import axios from "axios";
import s from "./Dictaphone.module.scss"
import {Select} from '@chakra-ui/react'
import useSearchDebounce from "../../helpers/useSearchDebounce.ts";

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [transDB, setTransDB] = useSearchDebounce();

  const [translatedValue, setTranslatedValue] = useState<string>("");
  const [inputLang, setInputLang] = useState<string>("");
  const [outputLang, setOutputLang] = useState<string>("");

  // useEffect(() => {
  //   async function f() {
  //     const encodedParams = new URLSearchParams();
  //     encodedParams.set('source_language', 'en');
  //     encodedParams.set('target_language', 'ru');
  //     encodedParams.set('text', transcript);
  //     const options = {
  //       method: 'POST',
  //       url: 'https://text-translator2.p.rapidapi.com/translate',
  //       headers: {
  //         'content-type': 'application/x-www-form-urlencoded',
  //         'X-RapidAPI-Key': '455250a185msh03bea97bfadd337p19bfd9jsn8795fcf5cc2a',
  //         'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
  //       },
  //       data: encodedParams,
  //     };
  //
  //     try {
  //       const response = await axios.request(options);
  //       setTranslatedValue(response.data.data.translatedText)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //
  //   if (transcript) {
  //     f()
  //   }
  //
  // }, [transDB])

  useEffect(() => {
    async function f() {
      const encodedParams = new URLSearchParams();
      encodedParams.set('language_to', outputLang);
      encodedParams.set('text', transcript);
      const options = {
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/translate',
        data: encodedParams,
      };

      try {
        const response = await axios.request(options);
        setTranslatedValue(response.data.text)
      } catch (error) {
        console.error(error);
      }
    }

    if (transcript) {
      f()
    }

  }, [transDB])

  useEffect(() => {
    setTransDB(transcript)
  }, [transcript])


  const handleResetClick = () => {
    resetTranscript();
    setTranslatedValue("")
  }

  console.log(outputLang, "outputLang")
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }


  return (
    <div className={s.container}>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className={s.buttons}>
        <button onClick={() => SpeechRecognition.startListening({language: inputLang, continuous: true})}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>


      <div className={s.selector}>
        <Select placeholder="From" value={inputLang} onChange={(e) => setInputLang(e.target.value)}>
          <option value='en'>English</option>
          <option value='tr'>Turkish</option>
          <option value='ru'>Russian</option>
        </Select>
        <Select placeholder='To' value={outputLang} onChange={(e) => setOutputLang(e.target.value)}>
          <option value='en'>English</option>
          <option value='tr'>Turkish</option>
          <option value='ru'>Russian</option>
        </Select>
      </div>
      
      <div className={s.input}>
        <p>Input EN</p>
        <p>{transcript}</p>
      </div>
      <div className={s.output}>

        <p>Translate RU</p>
        <p>{translatedValue}</p>
      </div>
    </div>
  );
};
export default Dictaphone;