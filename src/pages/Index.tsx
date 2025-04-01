
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="text-center max-w-3xl px-4">
        <div className="flex justify-center mb-6">
          <Layers className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">StudySwipeMates</h1>
        <p className="text-xl text-slate-700 mb-8">
          Find your perfect study partner! Connect with students who complement 
          your academic strengths and weaknesses. Swipe, match, and excel together.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row gap-8 justify-center text-left">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm">
            <h3 className="text-xl font-semibold mb-3">Match with Compatible Students</h3>
            <p className="text-slate-600">
              Our algorithm matches you with fellow students whose academic 
              strengths complement your weaknesses, and vice versa.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md max-w-sm">
            <h3 className="text-xl font-semibold mb-3">Study Smarter, Not Harder</h3>
            <p className="text-slate-600">
              Collaborate with study partners who can help you understand difficult subjects 
              while you help them with topics you excel in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
