import { useState } from 'react';
import { FileText, Loader2, Copy, Download, Sparkles, Briefcase, Scale, AlertCircle, Cloud, Check } from 'lucide-react';
import { getAccessToken, uploadFileToDrive, googleSignIn } from '../lib/googleDrive';

export default function LegalTemplateEngine() {
  const [selectedTemplate, setSelectedTemplate] = useState('restructuring');
  const [entityName, setEntityName] = useState('');
  const [financialExposure, setFinancialExposure] = useState('');
  const [circumstances, setCircumstances] = useState('');
  const [communicationTone, setCommunicationTone] = useState('Corporate');
  const [generatedDocument, setGeneratedDocument] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [documentCopied, setDocumentCopied] = useState(false);

  // Google Drive integration state
  const [driveUploading, setDriveUploading] = useState(false);
  const [driveUploadSuccess, setDriveUploadSuccess] = useState(false);
  const [driveUploadError, setDriveUploadError] = useState<string | null>(null);

  const handleDriveExport = async () => {
    setDriveUploadError(null);
    setDriveUploadSuccess(false);
    
    let token = getAccessToken();
    if (!token) {
      try {
        const res = await googleSignIn();
        if (!res) return;
        token = res.accessToken;
      } catch (err: any) {
        setDriveUploadError('Google connection failed: ' + err.message);
        return;
      }
    }

    setDriveUploading(true);
    try {
      const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
      const filename = `${selectedTemplateData?.title || 'Letter'} - ${entityName || 'Creditor'}.txt`;
      await uploadFileToDrive(filename, generatedDocument);
      setDriveUploadSuccess(true);
      setTimeout(() => setDriveUploadSuccess(false), 5000);
    } catch (err: any) {
      setDriveUploadError(err.message || 'Failed to upload to Google Drive.');
    } finally {
      setDriveUploading(false);
    }
  };

  const templates = [
    {
      id: 'restructuring',
      title: 'Corporate Restructuring',
      description: 'Strategic debt restructuring proposals for institutional stakeholders',
      icon: Briefcase,
      color: 'blue',
      category: 'Strategic'
    },
    {
      id: 'compliance',
      title: 'Regulatory Compliance',
      description: 'Compliance documentation for financial regulatory requirements',
      icon: Scale,
      color: 'purple',
      category: 'Legal'
    },
    {
      id: 'hardship',
      title: 'Financial Hardship Declaration',
      description: 'Formal hardship documentation with supporting evidence framework',
      icon: AlertCircle,
      color: 'orange',
      category: 'Administrative'
    },
    {
      id: 'negotiation',
      title: 'Strategic Negotiation Brief',
      description: 'Comprehensive negotiation framework for complex financial arrangements',
      icon: Sparkles,
      color: 'green',
      category: 'Strategic'
    }
  ];

  const toneOptions = [
    { value: 'Corporate', label: 'Corporate Executive', description: 'High-level business communication' },
    { value: 'Legal', label: 'Legal Professional', description: 'Formal legal documentation style' },
    { value: 'Diplomatic', label: 'Diplomatic', description: 'Negotiation-focused approach' },
    { value: 'Technical', label: 'Technical Analysis', description: 'Data-driven financial analysis' }
  ];

  const generateDocument = async () => {
    if (!entityName || !financialExposure || !circumstances) return;
    setIsProcessing(true);
    try {
      const res = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: selectedTemplate, 
          creditor: entityName, 
          amount: financialExposure, 
          hardshipReason: circumstances, 
          tone: communicationTone 
        })
      });
      const data = await res.json();
      setGeneratedDocument(data.letter);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyDocument = () => {
    navigator.clipboard.writeText(generatedDocument);
    setDocumentCopied(true);
    setTimeout(() => setDocumentCopied(false), 2000);
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent mb-2">
          Legal Template Engine
        </h1>
        <p className="text-indigo-200">Advanced document generation platform for complex financial and legal correspondence</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Template Selection & Configuration */}
        <div className="space-y-6">
          {/* Template Cards */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Document Templates
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => {
                const Icon = template.icon;
                const isSelected = selectedTemplate === template.id;
                const colorClasses = {
                  blue: isSelected ? 'bg-blue-500/20 border-blue-400/50' : 'border-blue-500/20 hover:bg-blue-500/10',
                  purple: isSelected ? 'bg-purple-500/20 border-purple-400/50' : 'border-purple-500/20 hover:bg-purple-500/10',
                  orange: isSelected ? 'bg-orange-500/20 border-orange-400/50' : 'border-orange-500/20 hover:bg-orange-500/10',
                  green: isSelected ? 'bg-green-500/20 border-green-400/50' : 'border-green-500/20 hover:bg-green-500/10'
                };
                
                return (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${colorClasses[template.color]} ${
                      isSelected ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-6 h-6" />
                      <div className="text-xs bg-current/20 px-2 py-1 rounded font-medium">
                        {template.category}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{template.title}</h3>
                    <p className="text-sm opacity-80">{template.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Configuration Form */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Document Configuration</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Entity/Institution</label>
                <input 
                  value={entityName} 
                  onChange={(e) => setEntityName(e.target.value)} 
                  type="text" 
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors" 
                  placeholder="e.g., Goldman Sachs International" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Financial Exposure Amount</label>
                <input 
                  value={financialExposure} 
                  onChange={(e) => setFinancialExposure(e.target.value)} 
                  type="text" 
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors" 
                  placeholder="₹25,00,000" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Communication Tone</label>
                <select 
                  value={communicationTone} 
                  onChange={(e) => setCommunicationTone(e.target.value)} 
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 transition-colors"
                >
                  {toneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} - {option.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Circumstances & Context</label>
                <textarea 
                  value={circumstances} 
                  onChange={(e) => setCircumstances(e.target.value)} 
                  rows={4} 
                  className="w-full bg-slate-900/50 border border-slate-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-400/50 resize-none transition-colors" 
                  placeholder="Provide detailed context for the financial situation and strategic objectives..." 
                />
              </div>
              
              <button 
                onClick={generateDocument} 
                disabled={isProcessing || !entityName || !financialExposure || !circumstances} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white font-medium transition-all duration-200 shadow-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Template...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate {selectedTemplateData?.title}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Document Preview */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 overflow-hidden">
          <div className="p-4 border-b border-slate-600/30 bg-slate-900/50 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white">Generated Document</h3>
              <p className="text-sm text-slate-400">
                {selectedTemplateData?.title} • {communicationTone} Tone
              </p>
            </div>
            {generatedDocument && (
              <div className="flex items-center gap-2">
                {driveUploadError && (
                  <span className="text-xs text-red-400 mr-2 max-w-[150px] truncate" title={driveUploadError}>{driveUploadError}</span>
                )}
                {driveUploadSuccess && (
                  <span className="text-xs text-teal-400 mr-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Exported!
                  </span>
                )}
                <button
                  onClick={handleDriveExport}
                  disabled={driveUploading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-white rounded-lg border border-purple-500/30 text-xs font-medium transition-all cursor-pointer disabled:opacity-50"
                  title="Export to Google Drive"
                >
                  {driveUploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Cloud className="w-3.5 h-3.5" />
                  )}
                  <span>Export to Drive</span>
                </button>
                <button 
                  onClick={copyDocument} 
                  className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer" 
                  title="Copy to clipboard"
                >
                  {documentCopied ? (
                    <span className="text-xs text-green-400 font-medium px-2">Copied!</span>
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <button 
                  className="p-2 hover:bg-slate-700/50 rounded-lg text-slate-400 hover:text-white transition-colors" 
                  title="Download document"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="p-6 h-[600px] overflow-y-auto font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap bg-slate-950/30">
            {generatedDocument ? generatedDocument : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
                <FileText className="w-16 h-16 mb-4" />
                <h4 className="text-lg font-medium mb-2">Ready for Document Generation</h4>
                <p className="text-center max-w-md">Configure your template parameters and click generate to create professional legal documentation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}