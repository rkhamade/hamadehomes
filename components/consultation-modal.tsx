'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';

interface ConsultationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 1 | 2 | 3;

interface FormData {
  intent: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
}

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    intent: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleIntentChange = (value: string) => {
    setFormData({ ...formData, intent: value });
  };

  const handleTimelineChange = (value: string) => {
    setFormData({ ...formData, timeline: value });
  };

  const handleInputChange = (field: keyof Omit<FormData, 'intent' | 'timeline'>) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1 && !formData.intent) return;
    if (step === 2 && !formData.timeline) return;
    if (step < 3) {
      setStep((step + 1) as Step);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setStep(1);
      setSubmitted(false);
      setFormData({
        intent: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
      });
    }, 2000);
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Thank you!</h2>
            <p className="mt-3 text-gray-600">
              We've received your request and will be in touch shortly with tailored insights for your goals.
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
            {step === 1 && 'What brings you in?'}
            {step === 2 && 'What\'s your timeline?'}
            {step === 3 && 'Let\'s connect'}
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
              <RadioGroup value={formData.intent} onValueChange={handleIntentChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buy" id="buy" />
                  <Label htmlFor="buy" className="cursor-pointer font-normal">
                    Buy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell" id="sell" />
                  <Label htmlFor="sell" className="cursor-pointer font-normal">
                    Sell
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invest" id="invest" />
                  <Label htmlFor="invest" className="cursor-pointer font-normal">
                    Invest
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="questions" id="questions" />
                  <Label htmlFor="questions" className="cursor-pointer font-normal">
                    Just have questions
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <RadioGroup value={formData.timeline} onValueChange={handleTimelineChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-3" id="0-3" />
                  <Label htmlFor="0-3" className="cursor-pointer font-normal">
                    0–3 months
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-6" id="3-6" />
                  <Label htmlFor="3-6" className="cursor-pointer font-normal">
                    3–6 months
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-12" id="6-12" />
                  <Label htmlFor="6-12" className="cursor-pointer font-normal">
                    6–12 months
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unsure" id="unsure" />
                  <Label htmlFor="unsure" className="cursor-pointer font-normal">
                    Not sure
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Your full name"
                  required
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
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.intent) ||
                  (step === 2 && !formData.timeline)
                }
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!formData.name || !formData.email || !formData.phone}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Book Consult
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
