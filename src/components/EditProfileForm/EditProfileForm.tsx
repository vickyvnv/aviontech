// src/components/EditProfileForm/EditProfileForm.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateProfile } from '../../api/userApi';
import { getGeolocationSuggestions } from '../../api/geolocationApi';
import PlacesAutocomplete from 'react-places-autocomplete';

interface UserProfile {
    id: number;
    username: string;
    address: string;
}

const EditProfileForm: React.FC = (): React.ReactElement | null => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await fetchUserProfile();
                const userProfileData: UserProfile = {
                    id: user?.id || 0,
                    username: user?.username || '',
                    address: user?.address?.address || '',
                };
                setUserProfile(userProfileData);
                setUsername(userProfileData.username || '');
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleAddressChange = async (value: string) => {

        setAddress(value);

        try {
            const suggestions = await getGeolocationSuggestions(value);
            console.log(suggestions, "sddc");
            setAddressSuggestions(suggestions);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const handleSelect = (selectedAddress: string) => {
        setAddress(selectedAddress);
        setAddressSuggestions([]);
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            if (userProfile) {
                const updatedProfile = {
                    id: userProfile.id,
                    username: username || '',
                    address: {
                        address: address,
                        city: '', 
                        coordinates: { lat: 0, lng: 0 }, 
                        postalCode: '',
                        state: '', 
                    },
                };

                await updateProfile(updatedProfile);
                navigate('/success');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    if (step === 1) {
        return (
            <div>
                <h2>Step 1: Edit Username</h2>
                <input type="text" value={username} onChange={handleUsernameChange} />
                <button onClick={handleNext}>Next</button>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div>
                <h2>Step 2: Edit Address</h2>
                <PlacesAutocomplete
                    value={address}
                    onChange={handleAddressChange}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input {...getInputProps({ placeholder: 'Type address' })} />
                            <div>
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion, index) => (
                                    <div {...getSuggestionItemProps(suggestion)}>
                                        {suggestion.description}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <button onClick={handlePrevious}>Previous</button>
                <button onClick={handleNext}>Next</button>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div>
                <h2>Step 3: Summary</h2>
                <p>Username: {username}</p>
                <p>Address: {address}</p>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        );
    }

    navigate('/success');
    return null; 
};

export default EditProfileForm;
