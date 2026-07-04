export type ActivePage = 'landing' | 'login' | 'signup';

export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  general?: string;
}

export interface MetricData {
  label: string;
  value: string;
  suffix: string;
  change: string;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface FrameworkLayer {
  step: string;
  tag: string;
  title: string;
  desc: string;
  metrics?: string[];
  icon: string;
}
