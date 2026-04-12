'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/gtag';

interface HomeValueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAddress?: string;
}

type Step = 1 | 2 | 3;

interface FormData {
  address: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  name: string;
  email: string;
  phone: string;
  timeline: string;
}

export function HomeValueModal({ open, onOpenChange, initialAddress = '' }: HomeValueModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    address: initialAddress,
    addressLine2: '',
    city: '',
    zipCode: '',
    name: '',
    email: '',
    phone: '',
    timeline: '',
  });

  useEffect(() => {
    if (open && initialAddress) {
      setFormData((prev) => ({ ...prev, address: initialAddress }));
    }
  }, [open, initialAddress]);

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
    if (step === 1 && (!formData.address.trim() || !formData.city.trim() || !formData.zipCode.trim())) {
      setError('Please enter a street address, city, and ZIP code');
      return;
    }
    if (step === 2 && (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim())) {
      setError('Please enter your name, email, and phone');
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

  const generateAiSummary = (data: FormData): string => {
    const fullAddress = [
      data.address,
      data.addressLine2,
      data.city,
      data.zipCode,
    ].filter(Boolean).join(', ');

    const timelinePart =
      data.timeline === 'Just curious'
        ? 'and is currently just curious about the property value.'
        : `and is planning to move within ${data.timeline}.`;

    return `${data.name.trim()} is requesting a home valuation for ${fullAddress} ${timelinePart}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.city || !formData.zipCode || !formData.name || !formData.email || !formData.phone || !formData.timeline) {
      setError('Please complete all fields');
      return;
    }

    const nameParts = formData.name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    const aiSummary = generateAiSummary(formData);

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = JSON.stringify({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        leadType: 'Home Valuation',
        timeline: formData.timeline,
        address: formData.address,
        addressLine2: formData.addressLine2,
        city: formData.city,
        zipCode: formData.zipCode,
        aiSummary,
      });

      await fetch(process.env.NEXT_PUBLIC_ZAPIER_WEBHOOK_URL!, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: payload,
      });

      trackEvent('home_value_submit', {
        property_address: [formData.address, formData.city, formData.zipCode].filter(Boolean).join(', '),
        timeline: formData.timeline,
      });
      setSubmitted(true);
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        setSubmitted(false);
        setFormData({ address: '', addressLine2: '', city: '', zipCode: '', name: '', email: '', phone: '', timeline: '' });
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
                <Label htmlFor="address">Street Address <span className="text-red-500">*</span></Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  placeholder="123 Main St"
                  required
                  autoFocus
                />
              </div>
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input
                  id="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange('addressLine2')}
                  placeholder="Apt, Suite, Unit (optional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    placeholder="Novi"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code <span className="text-red-500">*</span></Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange('zipCode')}
                    placeholder="48374"
                    required
                  />
                </div>
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
