
import React from 'react';
import { Shield, Clock, Upload, Phone } from 'lucide-react';

export const AgentAuditCard = () => {
  const auditScores = {
    callResponse: 85, // % calls made within 10 mins
    proofUpload: 92, // % orders with proof uploaded on time
    followUp: 78    // % of missed follow-ups
  };

  const overallScore = Math.round((auditScores.callResponse + auditScores.proofUpload + auditScores.followUp) / 3);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-800">🔍 AGENT AUDIT SCORE</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}%
          </div>
          <div className="text-sm text-gray-600">Overall Score</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Quick Response</span>
            </div>
            <span className={`font-bold ${getScoreColor(auditScores.callResponse)}`}>
              {auditScores.callResponse}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Proof Upload</span>
            </div>
            <span className={`font-bold ${getScoreColor(auditScores.proofUpload)}`}>
              {auditScores.proofUpload}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm">Follow-ups</span>
            </div>
            <span className={`font-bold ${getScoreColor(auditScores.followUp)}`}>
              {auditScores.followUp}%
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${getScoreBg(overallScore)}`}
          style={{ width: `${overallScore}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-gray-600 mt-2 text-center">
        {overallScore >= 80 ? "🔥 You dey do well!" : overallScore >= 60 ? "💪 Keep pushing!" : "⚠️ Need improvement!"}
      </p>
    </div>
  );
};
