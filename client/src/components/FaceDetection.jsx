import React, { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import '../index.css'

function App(){
    const videoRef = useRef()
    const canvasRef = useRef()
  
    useEffect(()=>{
      startVideo()
      videoRef && loadModels()
  
    },[])

    const startVideo = ()=>{
      navigator.mediaDevices.getUserMedia({video:true})
      .then((currentStream)=>{
        videoRef.current.srcObject = currentStream
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  
    const loadModels = ()=>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
  
        ]).then(()=>{
        faceMyDetect()
      })
    }
  
    const faceMyDetect = ()=>{
      setInterval(async()=>{
        const detections = await faceapi.detectAllFaces(videoRef.current,
          new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
  

        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
        faceapi.matchDimensions(canvasRef.current,{
          width:940,
          height:650
        })
  
        const resized = faceapi.resizeResults(detections,{
           width:940,
          height:650
        })
  
        faceapi.draw.drawDetections(canvasRef.current,resized)
        faceapi.draw.drawFaceLandmarks(canvasRef.current,resized)
        faceapi.draw.drawFaceExpressions(canvasRef.current,resized)
  
  
      },1000)
    }
  

  return (
    <div className="myapp bg-zinc-900 flex flex-col justify-between w-[750px] h-[700px] items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Face Detection</h1>
      <div className="appvide flex items-center">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay className="rounded-lg shadow-md"></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas mt-8 rounded-lg shadow-md"></canvas>
    </div>
  );
}

export default App;
