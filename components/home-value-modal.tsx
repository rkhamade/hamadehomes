'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

interface HomeValueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  propertyAddress: string;
  name: string;
  email: string;
  timeline: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function HomeValueModal({ open, onOpenChange }: HomeValueModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    propertyAddress: '',
    name: '',
    email: '',
    timeline: '',
  });

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError(null);
  };

  const handleTimelineChange = (value: string) => {
    setFormData({ ...formData, timeline: value });
    setError(null);
  };

  const handleNext = () => {
    if (step === 1 && !formData.propertyAddress.trim()) {
      setError('Please enter a property address');
      return;
    }
    if (step === 2 && (!formData.name.trim() || !formData.email.trim())) {
      setError('Please enter your name and email');
      return;
    }
    if (step < 3) {
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
    if (!formData.propertyAddress || !formData.name || !formData.email || !formData.timeline) {
      setError('Please complete all fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: '',
          address: formData.propertyAddress,
          timeline: formData.timeline,
          source: 'Home Value Modal',
        });

      if (insertError) throw insertError;

      fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/notify-new-lead`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: '',
            address: formData.propertyAddress,
            timeline: formData.timeline,
            source: 'Home Value Modal',
          }),
        }
      );

      setSubmitted(true);
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        setSubmitted(false);
        setFormData({ propertyAddress: '', name: '', email: '', timeline: '' });
      }, 2500);
    } catch (err) {
      console.error('Error submitting home value request:', err);
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
              A detailed home value analysis will be prepared and sent to your email within 24 hours.
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
          <DialogTitle className="text-2xl">
            {step === 1 && 'Property Address'}
            {step === 2 && 'Contact Information'}
            {step === 3 && 'Selling Timeline'}
          </DialogTitle>
        </DialogHeader>

        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((i) => (
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
                <Label htmlFor="propertyAddress">Full Property Address</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={handleInputChange('propertyAddress')}
                  placeholder="123 Main St, Novi, MI 48374"
                  required
                  autoFocus
                />
                <p className="mt-2 text-sm text-gray-500">
                  Include street address, city, and ZIP code
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Your full name"
                  required
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <RadioGroup value={formData.timeline} onValueChange={handleTimelineChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-3 months" id="0-3" />
                  <Label htmlFor="0-3" className="cursor-pointer font-normal">0–3 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-6 months" id="3-6" />
                  <Label htmlFor="3-6" className="cursor-pointer font-normal">3–6 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-12 months" id="6-12" />
                  <Label htmlFor="6-12" className="cursor-pointer font-normal">6–12 months</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Just curious" id="just-curious" />
                  <Label htmlFor="just-curious" className="cursor-pointer font-normal">Just curious about value</Label>
                </div>
              </RadioGroup>
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
            {step < 3 ? (
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
                disabled={!formData.timeline || isSubmitting}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? 'Submitting...' : 'Request Home Value'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
