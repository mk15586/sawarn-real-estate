'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';

type PropertyFiltersProps = {
  propertyTypes: string[];
};

export default function PropertyFilters({ propertyTypes }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );
  
  const handleSelectChange = (name: string) => (value: string) => {
    router.push(pathname + '?' + createQueryString(name, value), { scroll: false });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const queryString = createQueryString(name, value);
    router.push(pathname + '?' + queryString, { scroll: false });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select onValueChange={handleSelectChange('type')} value={searchParams.get('type') || ''}>
                    <SelectTrigger>
                        <SelectValue placeholder="Any Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Any Type</SelectItem>
                        {propertyTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Min Price</label>
                <Input name="minPrice" placeholder="e.g. 500000" type="number" step="10000" onChange={handleInputChange} defaultValue={searchParams.get('minPrice') || ''} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Max Price</label>
                <Input name="maxPrice" placeholder="e.g. 1200000" type="number" step="10000" onChange={handleInputChange} defaultValue={searchParams.get('maxPrice') || ''} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Beds</label>
                <Select onValueChange={handleSelectChange('beds')} value={searchParams.get('beds') || ''}>
                    <SelectTrigger>
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        {[1, 2, 3, 4, 5].map(v => <SelectItem key={v} value={String(v)}>{v}+ Beds</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium">Baths</label>
                <Select onValueChange={handleSelectChange('baths')} value={searchParams.get('baths') || ''}>
                    <SelectTrigger>
                        <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">Any</SelectItem>
                        {[1, 2, 3, 4, 5].map(v => <SelectItem key={v} value={String(v)}>{v}+ Baths</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">Reset</Button>
        </div>
    </div>
  );
}
