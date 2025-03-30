import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Types for Indonesian regional data
interface Province {
    id: string;
    name: string;
}

interface Regency {
    id: string;
    province_id: string;
    name: string;
}

interface District {
    id: string;
    regency_id: string;
    name: string;
}

interface Village {
    id: string;
    district_id: string;
    name: string;
}

// Form Types
export interface AddressForm {
    fullName: string;
    phoneNumber: string;
    village: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    notes: string;
    provinceId?: string;
    regencyId?: string;
    districtId?: string;
    villageId?: string;
}

interface AddressFormProps {
    address: AddressForm;
    provinces: Province[];
    regencies: Regency[];
    districts: District[];
    villages: Village[];
    loadingRegencies: boolean;
    loadingDistricts: boolean;
    loadingVillages: boolean;
    isComplete: boolean;
    onChange: (field: keyof AddressForm, value: string) => void;
    onBack: () => void;
    onContinue: () => void;
}

export function AddressForm({
    address,
    provinces,
    regencies,
    districts,
    villages,
    loadingRegencies,
    loadingDistricts,
    loadingVillages,
    isComplete,
    onChange,
    onBack,
    onContinue
}: AddressFormProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Shipping Address</h2>
                <p className="text-muted-foreground">
                    Enter your shipping details for this order.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            value={address.fullName}
                            onChange={(e) => onChange('fullName', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            placeholder="Enter your phone number"
                            value={address.phoneNumber}
                            onChange={(e) => onChange('phoneNumber', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="province">Province</Label>
                        <Select
                            value={address.provinceId}
                            onValueChange={(value) => onChange('provinceId', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select province" />
                            </SelectTrigger>
                            <SelectContent>
                                {provinces.map((province) => (
                                    <SelectItem key={province.id} value={province.id}>
                                        {province.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City/Regency</Label>
                        <Select
                            value={address.regencyId}
                            onValueChange={(value) => onChange('regencyId', value)}
                            disabled={!address.provinceId || loadingRegencies}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={loadingRegencies ? "Loading..." : "Select city/regency"} />
                            </SelectTrigger>
                            <SelectContent>
                                {regencies.map((regency) => (
                                    <SelectItem key={regency.id} value={regency.id}>
                                        {regency.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="district">District</Label>
                        <Select
                            value={address.districtId}
                            onValueChange={(value) => onChange('districtId', value)}
                            disabled={!address.regencyId || loadingDistricts}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={loadingDistricts ? "Loading..." : "Select district"} />
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map((district) => (
                                    <SelectItem key={district.id} value={district.id}>
                                        {district.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="village">Village</Label>
                        <Select
                            value={address.villageId}
                            onValueChange={(value) => onChange('villageId', value)}
                            disabled={!address.districtId || loadingVillages}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={loadingVillages ? "Loading..." : "Select village"} />
                            </SelectTrigger>
                            <SelectContent>
                                {villages.map((village) => (
                                    <SelectItem key={village.id} value={village.id}>
                                        {village.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                            id="postalCode"
                            placeholder="Enter postal code"
                            value={address.postalCode}
                            onChange={(e) => onChange('postalCode', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Input
                            id="notes"
                            placeholder="E.g., Landmark, specific directions"
                            value={address.notes}
                            onChange={(e) => onChange('notes', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Cart
                </Button>
                <Button
                    type="button"
                    onClick={onContinue}
                    disabled={!isComplete}
                >
                    Continue to Shipping
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
