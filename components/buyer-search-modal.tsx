'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/gtag';

interface BuyerSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3 | 4;

interface FormData {
  preferredArea: string;
  budgetRange: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

const BUDGET_OPTIONS = [
  'Under $300k',
  '$300k–$500k',
  '$500k–$750k',
  '$750k–$1M',
  '$1M+',
  'Not sure yet',
];

const TIMELINE_OPTIONS = [
  'Just browsing',
  '3–6 months',
  'Soon',
];

function generateBuyerAiSummary(data: FormData): string {
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0];
  return `${firstName} is looking to start a home search in ${data.preferredArea} with a budget of ${data.budgetRange}. Their move timeline is ${data.timeline}.`;
}

export function BuyerSearchModal({ open, onOpenChange }: BuyerSearchModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    preferredArea: '',
    budgetRange: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setSubmitted(false);
        setError(null);
        setFormData({ preferredArea: '', budgetRange: '', timeline: '', name: '', email: '', phone: '' });
      }, 300);
    }
  }, [open]);

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError(null);
  };

  const handleSelectOption = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setError(null);
  };

  const handleNext = () => {
    if (step === 1 && !formData.preferredArea.trim()) {
      setError('Please enter a city, area, or neighborhood');
      return;
    }
    if (step === 2 && !formData.budgetRange) {
      setError('Please select a budget range');
      return;
    }
    if (step === 3 && !formData.timeline) {
      setError('Please select a timeline');
      return;
    }
    if (step < 4) {
      setStep((step + 1) as Step);
      setError(null);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please enter your name and email');
      return;
    }

    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    const aiSummary = generateBuyerAiSummary(formData);

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = JSON.stringify({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        leadType: 'Buyer Search',
        preferredArea: formData.preferredArea,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        aiSummary,
        source: 'Buyer Landing Page',
      });

      await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL!, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: payload,
      });

      trackEvent('buyer_search_submit', {
        preferred_area: formData.preferredArea,
        budget_range: formData.budgetRange,
        timeline: formData.timeline,
      });
      setSubmitted(true);
      setTimeout(() => {
        onOpenChange(false);
      }, 2500);
    } catch (err) {
      console.error('Error submitting buyer search request:', err);
      setError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Request Received</h2>
            <p className="mt-3 text-gray-600">
              A search plan will be prepared shortly.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Start Your Search</DialogTitle>
        </DialogHeader>

        <div className="mb-6 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? 'bg-red-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="preferredArea">Preferred Area <span className="text-red-500">*</span></Label>
                <Input
                  id="preferredArea"
                  value={formData.preferredArea}
                  onChange={handleInputChange('preferredArea')}
                  placeholder="Enter city, area, or neighborhood"
                  required
                  autoFocus
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <Label className="block mb-1">Budget Range <span className="text-red-500">*</span></Label>
              <div className="grid grid-cols-2 gap-2">
                {BUDGET_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption('budgetRange', option)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium text-left transition-all duration-150 ${
                      formData.budgetRange === option
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <Label className="block mb-1">Timeline <span className="text-red-500">*</span></Label>
              <div className="flex flex-col gap-2">
                {TIMELINE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectOption('timeline', option)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium text-left transition-all duration-150 ${
                      formData.timeline === option
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Full name"
                  required
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone <span className="text-gray-400 font-normal">(optional)</span></Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!formData.name.trim() || !formData.email.trim() || isSubmitting}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? 'Submitting...' : 'Start My Search'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
