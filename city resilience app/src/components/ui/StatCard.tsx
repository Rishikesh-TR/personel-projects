import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 transition-transform hover:transform hover:scale-102">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
        <div className="p-2 bg-neutral-100 rounded-full">{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-neutral-800">{value}</p>
          <div className="flex items-center mt-1">
            {trendUp ? (
              <TrendingUp size={14} className="text-success-500 mr-1" />
            ) : (
              <TrendingDown size={14} className="text-neutral-500 mr-1" />
            )}
            <span className={`text-xs ${trendUp ? 'text-success-500' : 'text-neutral-500'}`}>
              {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;