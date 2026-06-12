import React, { useState } from 'react';
import { Shield, Key, Eye, User, Lock, RefreshCw, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { AuditLog } from '../types';

interface SecurityViewProps {
  auditLogs: AuditLog[];
  onAddAuditLog: (action: string, details: string) => void;
}

export default function SecurityView({ auditLogs, onAddAuditLog }: SecurityViewProps) {
  // MFA Switch states
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [oauthConnected, setOauthConnected] = useState(false);
  const [securityScore, setSecurityScore] = useState(75);

  const [activeSessions, setActiveSessions] = useState([
    { id: 'sess-1', device: 'Chome v121 - macOS (Libreville, Gabon)', status: 'Active', ip: '197.214.3.45' },
    { id: 'sess-2', device: 'Safari - iPhone 15 (Akanda, Gabon)', status: 'Déconnecté', ip: '197.214.12.102' }
  ]);

  const handleMfaToggle = () => {
    const nextState = !mfaEnabled;
    setMfaEnabled(nextState);
    setSecurityScore(nextState ? 95 : 75);
    onAddAuditLog(
      'MFA_CONFIGURATION_CHANGE',
      `L'Authentification Multifactorielle (MFA) a été ${nextState ? 'ACTIVÉE' : 'DÉSACTIVÉE'} par l'utilisateur.`
    );
    alert(`L'authentification à double facteur (MFA) a été ${nextState ? 'activée avec succès' : 'désactivée'}. Vos connexions requièrent désormais la validation SMS.`);
  };

  const handleOAuthConnect = () => {
    if (oauthConnected) {
      setOauthConnected(false);
      onAddAuditLog('OAUTH_DISCONNECT', "Déconnexion sécurisée du profil Google G-Suite.");
    } else {
      setOauthConnected(true);
      onAddAuditLog('OAUTH_CONNECT_SUCCESS', "Authentification Google OAuth 2.0 complétée pour l'utilisateur willsangeloboussamba@gmail.com.");
      alert("Votre compte a été associé à votre profil Google G-Suite avec succès !");
    }
  };

  const handleSessionRevocation = (sessId: string, device: string) => {
    setActiveSessions(activeSessions.filter((s) => s.id !== sessId));
    onAddAuditLog('SESSION_REVOCATION', `Révocation forcée de la session distante [${device}].`);
    alert(`La session sur le périphérique '${device}' a été fermée et révoquée.`);
  };

  return (
    <div id="security-view-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-4 pb-12 text-left">
      
      {/* Left side settings */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Security Score Widget */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              🛡️ Score global de Protection
            </h3>
            <span className="font-mono text-xs text-slate-500">Mise à jour en temps réel</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
              <div 
                className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
                  securityScore > 85 ? 'border-emerald-500' : 'border-yellow-500'
                }`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
              ></div>
              <span className="text-2xl font-mono font-bold text-white">{securityScore}%</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="font-semibold text-white">Niveau de protection : {securityScore > 85 ? 'Hautement Sécurisé' : 'Modéré'}</p>
              <ul className="space-y-1 list-disc pl-4">
                <li>Chiffrement SSL/TLS Activé</li>
                <li>MFA : <span className={mfaEnabled ? 'text-emerald-400 font-bold' : 'text-yellow-400 font-bold'}>{mfaEnabled ? 'Activé (Double Facteur)' : 'Désactivé'}</span></li>
                <li>Liaison Google OAuth : <span className={oauthConnected ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{oauthConnected ? 'Associé' : 'Non lié'}</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Credentials and MFA management toggles */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Paramètres essentiels de connexion</h3>
          
          <div className="space-y-4 text-xs">
            {/* Google OAuth Connector */}
            <div className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-slate-855">
              <div className="space-y-1">
                <strong className="text-white block font-medium">Liaison Google OAuth Security</strong>
                <p className="text-[10px] text-slate-500 leading-tight">Connectez-vous en un clic avec votre compte Google Workspace.</p>
              </div>
              <button
                onClick={handleOAuthConnect}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition ${
                  oauthConnected
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                }`}
              >
                {oauthConnected ? 'Dissocier' : 'Se connecter avec Google'}
              </button>
            </div>

            {/* MFA Switch */}
            <div className="flex justify-between items-center p-3.5 bg-slate-950 rounded-xl border border-slate-855">
              <div className="space-y-1">
                <strong className="text-white block font-medium">Authentification à Double Facteur (MFA)</strong>
                <p className="text-[10px] text-slate-500 leading-tight">Validez votre identité par code Airtel Money ou SMS OTP lors de la connexion.</p>
              </div>
              <button
                onClick={handleMfaToggle}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition ${
                  mfaEnabled
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'bg-yellow-500/15 text-yellow-500 border border-yellow-500/20'
                }`}
              >
                {mfaEnabled ? 'Désactiver double facteur' : 'Activer double facteur'}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Right side active sessions & trust logs */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Active sessions tracking */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            🖥️ Périphériques & Sessions Actives
          </h3>
          
          <div className="space-y-3 font-sans text-xs">
            {activeSessions.map((sess) => (
              <div key={sess.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-855 flex justify-between items-center">
                <div className="space-y-1">
                  <strong className="text-white block font-semibold">{sess.device}</strong>
                  <span className="block text-[10px] text-slate-500 font-mono">Adresse de traçabilité IP : {sess.ip}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    sess.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {sess.status}
                  </span>
                  {sess.status === 'Active' && (
                    <button
                      onClick={() => handleSessionRevocation(sess.id, sess.device)}
                      className="text-slate-500 hover:text-rose-400 text-[10px] underline ml-2 cursor-pointer"
                    >
                      Révoquer
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit guidelines reminder */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-xs space-y-3 leading-relaxed font-light">
          <h4 className="font-semibold text-white">📡 Journal d'Audit & Conformité RGPD Gabon</h4>
          <p className="text-slate-400 text-xs">
            StrongMarket Gabon est conforme aux réglementations de l'ANINF et de la Commission Nationale de Protection des Données Personnelles (CNPDCP). Les activités d'accès et d'écritures bancaires font l'objet d'un journal cryptographique inviolable résidant dans nos conteneurs de cloud régionaux.
          </p>
        </div>

      </div>

    </div>
  );
}
