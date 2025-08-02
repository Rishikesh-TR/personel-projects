import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText,
  Settings,
  Download,
  Filter,
  ChevronDown
} from 'lucide-react';

const ComplianceChecker: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeStandard, setActiveStandard] = useState('is1893');
  const [complianceRun, setComplianceRun] = useState(true);
  
  return (
    <div className="max-w-6xl mx-auto py-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Compliance Checker</h1>
          <p className="text-neutral-500">Verify city design against regulatory standards</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 flex items-center">
            <Download size={16} className="mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
            Run New Check
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Standards */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="font-medium text-neutral-800">Compliance Standards</h2>
            </div>
            <div className="p-2">
              <StandardButton
                title="IS 1893:2016"
                description="Earthquake Code"
                active={activeStandard === 'is1893'}
                onClick={() => setActiveStandard('is1893')}
              />
              <StandardButton
                title="NBC 2016"
                description="National Building Code"
                active={activeStandard === 'nbc2016'}
                onClick={() => setActiveStandard('nbc2016')}
              />
              <StandardButton
                title="IRC:SP:55"
                description="Road Guidelines"
                active={activeStandard === 'ircsp55'}
                onClick={() => setActiveStandard('ircsp55')}
              />
              <StandardButton
                title="IS 11799"
                description="Flood Protection"
                active={activeStandard === 'is11799'}
                onClick={() => setActiveStandard('is11799')}
              />
              <StandardButton
                title="CPCB Standards"
                description="Environmental"
                active={activeStandard === 'cpcb'}
                onClick={() => setActiveStandard('cpcb')}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card overflow-hidden mt-6">
            <div className="p-4 border-b border-neutral-200">
              <h2 className="font-medium text-neutral-800">Summary</h2>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-600">Overall Compliance:</span>
                <span className="text-sm font-medium text-warning-600">87%</span>
              </div>
              <div className="bg-neutral-100 h-2 rounded-full mb-6">
                <div className="bg-warning-500 h-full rounded-full" style={{ width: '87%' }}></div>
              </div>
              
              <div className="space-y-3">
                <SummaryItem label="Passed Checks" value={32} color="success" />
                <SummaryItem label="Warnings" value={8} color="warning" />
                <SummaryItem label="Failed Checks" value={4} color="danger" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content - Compliance results */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="p-4 border-b border-neutral-200 flex justify-between items-center">
              <h2 className="font-medium text-neutral-800">
                {activeStandard === 'is1893' ? 'IS 1893:2016 Earthquake Code Compliance' :
                 activeStandard === 'nbc2016' ? 'NBC 2016 National Building Code Compliance' :
                 activeStandard === 'ircsp55' ? 'IRC:SP:55 Road Guidelines Compliance' :
                 activeStandard === 'is11799' ? 'IS 11799 Flood Protection Compliance' : 
                 'CPCB Environmental Standards Compliance'}
              </h2>
              <div className="flex space-x-2">
                <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-600">
                  <Settings size={18} />
                </button>
                <button className="p-1.5 rounded hover:bg-neutral-100 text-neutral-600">
                  <FileText size={18} />
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex justify-between items-center">
              <div>
                <span className="text-sm text-neutral-600">Last checked: Today at 10:45 AM</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-1.5 text-sm text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50">
                  <Filter size={14} className="mr-1.5" />
                  Filter
                  <ChevronDown size={14} className="ml-1.5" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-neutral-200">
              <ComplianceItem
                title="Building Seismic Zone Categorization"
                description="Buildings are correctly categorized for Zone IV"
                status="passed"
              />
              <ComplianceItem
                title="Structural System Requirements"
                description="Structures meet ductile detailing requirements"
                status="passed"
              />
              <ComplianceItem
                title="Foundation Design"
                description="Some foundational elements need additional reinforcement"
                status="warning"
                elements={['Northern Metro Station', 'Commercial Complex B12']}
              />
              <ComplianceItem
                title="Building Separation Requirements"
                description="Insufficient gap between adjacent tall structures"
                status="failed"
                elements={['Residential Towers R7-R9', 'Office Complex East']}
              />
              <ComplianceItem
                title="Structural Irregularity Controls"
                description="Vertical irregularities detected in 3 buildings"
                status="warning"
                elements={['Tech Park Building A', 'Hospital Tower']}
              />
              <ComplianceItem
                title="Steel Design Requirements"
                description="Steel elements meet earthquake-resistant design criteria"
                status="passed"
              />
              <ComplianceItem
                title="RC Frame Design Provisions"
                description="Reinforced concrete frames meet code requirements"
                status="passed"
              />
              <ComplianceItem
                title="Soil-Structure Interaction"
                description="Soil properties have been correctly factored"
                status="passed"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-card overflow-hidden mt-6 p-4">
            <h2 className="font-medium text-neutral-800 mb-3">Recommendations</h2>
            <div className="space-y-3">
              <RecommendationItem
                text="Increase separation between Residential Towers R7-R9 to at least 100mm as per IS 1893 Section 7.11.3"
                priority="high"
              />
              <RecommendationItem
                text="Reinforce foundation elements in Northern Metro Station with additional ties"
                priority="medium"
              />
              <RecommendationItem
                text="Review and redesign vertical elements in Tech Park Building A to reduce irregularities"
                priority="medium"
              />
              <RecommendationItem
                text="Perform additional soil testing near Office Complex East to validate soil-structure interaction models"
                priority="low"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StandardButtonProps {
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}

const StandardButton: React.FC<StandardButtonProps> = ({ title, description, active, onClick }) => {
  return (
    <button
      className={`w-full text-left p-3 rounded-md transition-colors
        ${active ? 'bg-primary-50 text-primary-700' : 'hover:bg-neutral-100 text-neutral-700'}`}
      onClick={onClick}
    >
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-neutral-500 mt-1">{description}</div>
    </button>
  );
};

interface SummaryItemProps {
  label: string;
  value: number;
  color: 'success' | 'warning' | 'danger';
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value, color }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-3 h-3 rounded-full mr-2 
          ${color === 'success' ? 'bg-success-500' : 
            color === 'warning' ? 'bg-warning-500' : 'bg-danger-500'}`}
        ></div>
        <span className="text-sm text-neutral-600">{label}</span>
      </div>
      <span className="text-sm font-medium text-neutral-700">{value}</span>
    </div>
  );
};

interface ComplianceItemProps {
  title: string;
  description: string;
  status: 'passed' | 'warning' | 'failed';
  elements?: string[];
}

const ComplianceItem: React.FC<ComplianceItemProps> = ({ title, description, status, elements }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {status === 'passed' && <CheckCircle size={18} className="text-success-500" />}
          {status === 'warning' && <AlertTriangle size={18} className="text-warning-500" />}
          {status === 'failed' && <XCircle size={18} className="text-danger-500" />}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-neutral-800">{title}</h3>
          <p className="text-sm text-neutral-600 mt-1">{description}</p>
          
          {elements && elements.length > 0 && (
            <div className="mt-2">
              <button
                className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? 'Hide details' : 'Show affected elements'}
                <ChevronDown size={12} className={`ml-1 transition-transform ${expanded ? 'transform rotate-180' : ''}`} />
              </button>
              
              {expanded && (
                <div className="mt-2 pl-2 border-l-2 border-neutral-200 space-y-1">
                  {elements.map((element, index) => (
                    <div key={index} className="text-xs text-neutral-600">{element}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 ml-4">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full
            ${status === 'passed' ? 'bg-success-100 text-success-800' : 
              status === 'warning' ? 'bg-warning-100 text-warning-800' : 
              'bg-danger-100 text-danger-800'}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface RecommendationItemProps {
  text: string;
  priority: 'high' | 'medium' | 'low';
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({ text, priority }) => {
  return (
    <div className="p-3 border border-neutral-200 rounded-md">
      <div className="flex items-start">
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
          ${priority === 'high' ? 'bg-danger-500' : 
            priority === 'medium' ? 'bg-warning-500' : 'bg-success-500'}`}
        ></div>
        <div className="ml-2 flex-1">
          <p className="text-sm text-neutral-700">{text}</p>
          <div className="flex items-center mt-2">
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${priority === 'high' ? 'bg-danger-100 text-danger-800' : 
                priority === 'medium' ? 'bg-warning-100 text-warning-800' : 
                'bg-success-100 text-success-800'}`}>
              {priority} priority
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecker;