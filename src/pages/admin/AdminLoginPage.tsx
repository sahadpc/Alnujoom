import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Glasses, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo, isAuthenticated, isDemoMode } = useAuth();

  const [email, setEmail] = useState('admin@alnujoom.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    document.title = 'Admin Login | AlNujoom Opticals';
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await login(email.trim(), password);
      if (res.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    await loginAsDemo();
    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Icon */}
        <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4 group">
          <div className="w-12 h-12 rounded-2xl bg-navy-900 text-white flex items-center justify-center shadow-soft-md group-hover:bg-brand-accent transition-colors">
            <Glasses className="w-7 h-7" />
          </div>
        </Link>
        <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">
          AlNujoom Opticals
        </h2>
        <p className="mt-1 text-xs uppercase font-bold tracking-widest text-brand-accent">
          Staff & Inventory Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-gray-100 shadow-soft-xl">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Staff Email"
              type="email"
              placeholder="admin@alnujoom.com"
              required
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              leftIcon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full justify-center shadow-soft-md"
              >
                Sign In to Dashboard
              </Button>
            </div>
          </form>

          {/* Quick Demo One-Click Access Box */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200/80 text-center">
              <div className="text-xs font-bold text-navy-900 mb-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>One-Click Store Manager Access</span>
              </div>
              <p className="text-[11px] text-gray-500 mb-3">
                Pre-filled credentials: <code className="bg-white px-1.5 py-0.5 rounded text-navy-900 border">admin@alnujoom.com</code> / <code className="bg-white px-1.5 py-0.5 rounded text-navy-900 border">Admin@123</code>
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleQuickDemoLogin}
                className="w-full justify-center bg-white border-gray-200 text-navy-900"
              >
                Sign In Instantly as Store Manager
              </Button>
            </div>
          </div>

          {/* Return to website */}
          <div className="mt-5 text-center">
            <Link
              to="/"
              className="text-xs font-semibold text-gray-500 hover:text-navy-900 transition-colors"
            >
              ← Return to AlNujoom Customer Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
