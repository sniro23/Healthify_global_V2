'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../button';
import { Card, CardContent } from '../card';
import { Mic, MicOff, Video, VideoOff, Phone, Share, MessageSquare } from 'lucide-react';
import { cn } from '../utils';

interface VideoCallProps {
  sessionId: string;
  patientName?: string;
  doctorName?: string;
  onEndCall?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export function VideoCall({ 
  sessionId, 
  patientName, 
  doctorName, 
  onEndCall, 
  onError,
  className 
}: VideoCallProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // Mock connection setup - in a real implementation, this would use WebRTC or a provider like Twilio
  useEffect(() => {
    // Setup connection
    let connectionTimeout: NodeJS.Timeout;
    
    const setupCall = async () => {
      try {
        // Simulate connection delay
        connectionTimeout = setTimeout(() => {
          setIsConnected(true);
          
          // Get local video stream (in a real app)
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              .then(stream => {
                if (localVideoRef.current) {
                  localVideoRef.current.srcObject = stream;
                }
                // In a real implementation, you would also connect to the remote stream here
              })
              .catch(err => {
                console.error('Error accessing media devices:', err);
                if (onError) onError(err);
              });
          }
        }, 1500);
      } catch (error) {
        console.error('Failed to set up call:', error);
        if (onError) onError(error as Error);
      }
    };
    
    setupCall();
    
    // Timer for call duration
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => {
      clearTimeout(connectionTimeout);
      clearInterval(timer);
      
      // Cleanup video streams
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onError]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    
    // In a real implementation, you would also toggle the audio track
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
    }
  };
  
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    
    // In a real implementation, you would also toggle the video track
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
    }
  };
  
  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
    
    // In a real implementation, you would handle screen sharing here
  };
  
  const handleEndCall = () => {
    if (onEndCall) onEndCall();
  };
  
  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="relative flex-1 bg-gray-900 rounded-md overflow-hidden">
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
              <p>Connecting to secure video call...</p>
            </div>
          </div>
        )}
        
        {/* Main video (remote participant) */}
        <video 
          ref={remoteVideoRef}
          className={cn(
            "w-full h-full object-cover", 
            !isConnected && "hidden"
          )}
          autoPlay 
          playsInline
        />
        
        {/* Self view (local participant) */}
        <div className="absolute bottom-4 right-4 w-1/4 max-w-[200px] aspect-video rounded-md overflow-hidden shadow-lg border-2 border-white bg-gray-800">
          <video 
            ref={localVideoRef}
            className={cn(
              "w-full h-full object-cover",
              !isVideoEnabled && "hidden"
            )}
            autoPlay 
            playsInline 
            muted
          />
          {!isVideoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
              <VideoOff className="w-6 h-6" />
            </div>
          )}
        </div>
        
        {/* Call info */}
        <div className="absolute top-4 left-4 bg-black/40 text-white text-sm px-3 py-1 rounded-full">
          {formatTime(elapsedTime)}
        </div>
        
        {/* Participant names */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-4 py-1 rounded-full flex items-center gap-2">
          {doctorName && patientName ? `${doctorName} · ${patientName}` : sessionId}
        </div>
      </div>
      
      {/* Controls */}
      <Card className="mt-4">
        <CardContent className="flex justify-between items-center p-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleAudio}
              className={!isAudioEnabled ? "bg-gray-200" : ""}
            >
              {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleVideo}
              className={!isVideoEnabled ? "bg-gray-200" : ""}
            >
              {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleScreenSharing}
              className={isScreenSharing ? "bg-gray-200" : ""}
            >
              <Share className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={isChatOpen ? "bg-gray-200" : ""}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
          
          <Button 
            variant="destructive" 
            className="bg-red-600 hover:bg-red-700"
            onClick={handleEndCall}
          >
            <Phone className="h-5 w-5 mr-2 rotate-135" />
            End Call
          </Button>
        </CardContent>
      </Card>
      
      {/* Chat panel - would be implemented in a real app */}
      {isChatOpen && (
        <Card className="mt-4 h-64">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex-1 overflow-auto border rounded-md p-3 mb-3 bg-gray-50">
              <div className="text-center text-gray-500 text-sm italic">
                Chat messages will appear here
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 p-2 border rounded-md"
              />
              <Button>Send</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 