import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, 
  CloudCheck, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  FolderGit2, 
  User, 
  LogOut, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  googleSignIn, 
  googleSignOut, 
  initAuth, 
  uploadFileToDrive, 
  getAccessToken 
} from '../lib/googleDrive';

export default function DriveCenter() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Backup configurations
  const [backupFilename, setBackupFilename] = useState('Project Drive Create.txt');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // File stats simulation or list
  const fileList = [
    { name: 'backend/server.ts', size: '5.2 KB', type: 'TypeScript Server' },
    { name: 'frontend/src/App.tsx', size: '7.8 KB', type: 'React Router' },
    { name: 'frontend/src/lib/googleDrive.ts', size: '3.1 KB', type: 'Google Integration' },
    { name: 'frontend/src/components/DriveCenter.tsx', size: '12.4 KB', type: 'Backup Dashboard' },
    { name: 'frontend/src/components/LetterGenerator.tsx', size: '11.8 KB', type: 'Legal Templates' },
    { name: 'package.json', size: '1.3 KB', type: 'Configuration' }
  ];

  useEffect(() => {
    // Initial Auth listener
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Authentication with Google failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    setErrorMessage(null);
    try {
      await googleSignOut();
      setUser(null);
      setToken(null);
      setUploadSuccess(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Logout failed.');
    }
  };

  const handleGenerateAndUploadBackup = async () => {
    if (!token) {
      setErrorMessage('Please sign in with Google first.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setUploadSuccess(null);

    try {
      // 1. Fetch consolidated codebase from backend
      const res = await fetch('/api/project/backup');
      if (!res.ok) {
        throw new Error('Failed to fetch project codebase backup from backend server.');
      }
      const data = await res.json();
      
      setIsGenerating(false);
      setIsUploading(true);

      // 2. Upload file to Google Drive using the access token
      const driveRes = await uploadFileToDrive(backupFilename, data.content, 'text/plain');
      
      setUploadSuccess(driveRes);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to create backup in Google Drive.');
    } finally {
      setIsGenerating(false);
      setIsUploading(false);
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8" id="drive-integration-hub">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/20 p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Workspace Integration
            </div>
            <h1 className="text-3xl font-display font-bold text-white tracking-tight">
              Google Drive Cloud Sync
            </h1>
            <p className="text-purple-200/70 max-w-2xl text-sm leading-relaxed">
              Export legal letters, professional reports, and generate secure developer source backups directly to your personal Google Drive in seconds.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            {user ? (
              <div className="flex items-center gap-4 bg-purple-950/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border border-purple-400/30" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg border border-purple-400/30">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-white">{user.displayName || 'Google Account'}</h4>
                  <p className="text-xs text-purple-300">{user.email}</p>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 mt-1 text-xs text-red-300 hover:text-red-200 transition-colors"
                  >
                    <LogOut className="w-3 h-3" /> Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="gsi-material-button flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3.5 rounded-2xl shadow-xl transition-all duration-200 border border-gray-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                {isLoggingIn ? (
                  <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
                ) : (
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                )}
                <span>Connect Google Drive</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {errorMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-300">Sync Error Detected</p>
            <p className="text-xs text-red-200/80 mt-1">{errorMessage}</p>
          </div>
        </motion.div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Backup Action Center */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-zinc-700/40 relative">
            <h3 className="text-xl font-display font-semibold text-white mb-4 flex items-center gap-2">
              <FolderGit2 className="w-5.5 h-5.5 text-purple-400" /> Codebase Backup Optimizer
            </h3>
            
            <p className="text-zinc-300 text-sm mb-6 leading-relaxed">
              Export the core file modules of the <strong>CreditFlow Pro</strong> system, including server APIs, database routers, and high-performance React components directly into a unified cloud-friendly document.
            </p>

            {/* Input field for backup name */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-purple-300 uppercase tracking-wider block">Target File Name in Drive</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
                <input 
                  type="text" 
                  value={backupFilename} 
                  onChange={(e) => setBackupFilename(e.target.value)}
                  placeholder="Project Drive Create.txt"
                  className="w-full bg-zinc-950/60 border border-zinc-700/50 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono"
                  disabled={isGenerating || isUploading}
                />
              </div>
            </div>

            {/* List of included file modules */}
            <div className="space-y-2.5 mb-8">
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Estimated Core Payload Content ({fileList.length} Files)</div>
              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 border border-zinc-800/55 rounded-xl p-3 bg-zinc-950/30">
                {fileList.map((file, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-2 px-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:bg-zinc-800/40 transition-colors">
                    <span className="font-mono text-zinc-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {file.name}
                    </span>
                    <div className="flex items-center gap-3 text-zinc-500">
                      <span>{file.type}</span>
                      <span className="font-semibold text-zinc-400">{file.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backup Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {user ? (
                <button
                  onClick={handleGenerateAndUploadBackup}
                  disabled={isGenerating || isUploading}
                  className="w-full sm:w-auto btn-gradient text-white flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold shadow-lg shadow-teal-500/10 cursor-pointer text-sm transform hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                      <span>Generating Backup Payload...</span>
                    </>
                  ) : isUploading ? (
                    <>
                      <Cloud className="w-4.5 h-4.5 animate-bounce" />
                      <span>Uploading to Google Drive...</span>
                    </>
                  ) : (
                    <>
                      <Cloud className="w-4.5 h-4.5" />
                      <span>Export Project Code to Google Drive</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-full sm:w-auto bg-purple-600/30 border border-purple-500/40 hover:bg-purple-600/40 text-purple-200 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <User className="w-4.5 h-4.5" />
                  <span>Connect Google to Enable Code Backup</span>
                </button>
              )}
              
              <div className="text-xs text-zinc-500 flex items-center gap-1.5 leading-relaxed">
                <Info className="w-4 h-4 text-purple-400/80 flex-shrink-0" />
                <span>Standard Google security rules apply. The applet will have access ONLY to the files created by this application.</span>
              </div>
            </div>

            {/* Upload success modal/alert */}
            {uploadSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-5 bg-teal-500/10 border border-teal-500/30 rounded-2xl space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white">Project Backup Created Successfully!</h4>
                    <p className="text-xs text-zinc-300 mt-1">
                      File <strong>{uploadSuccess.name}</strong> was created in your Google Drive under ID <strong>{uploadSuccess.id}</strong>.
                    </p>
                  </div>
                </div>

                {uploadSuccess.webViewLink && (
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-teal-500/20">
                    <a 
                      href={uploadSuccess.webViewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Open in Google Drive
                    </a>
                    
                    <button
                      onClick={() => handleCopyLink(uploadSuccess.webViewLink)}
                      className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-300 transition-colors bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-400" />
                          <span className="text-teal-400 font-medium">Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Web Link</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Integration guides & Features */}
        <div className="space-y-6">
          
          {/* Active Features Info Box */}
          <div className="glass-card rounded-3xl p-6 border border-zinc-700/40 bg-gradient-to-br from-zinc-900/60 via-zinc-900/30 to-purple-950/20">
            <h4 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
              <CloudCheck className="w-5 h-5 text-purple-400" /> Direct Integration Points
            </h4>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-purple-300">1. Codebase Archiver</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  The primary archiver generates absolute structures of key enterprise-grade templates, saving them directly to the user's cloud.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-purple-300">2. Legal Documents Vault</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Generate dispute templates, demand responses, or negotiation files, and instantly upload with zero copy-pasting.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-purple-300">3. Business Intelligence Reports</span>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Export financial recovery predictions, portfolio distributions, and optimized savings sheets instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Guide Steps */}
          <div className="glass-card rounded-3xl p-6 border border-zinc-700/40">
            <h4 className="text-base font-semibold text-white mb-4">Quick Cloud Guide</h4>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Authenticate your account using the **Connect Google Drive** action.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Define custom names like `Project Drive Create` for the output documents.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Export directly using the dynamic actions available across **Legal Templates** and **Reports** modules.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
