import { useEffect, useState } from "react"
import { Backendurl } from '../App'
import { toast } from "react-toastify"
import axios from "axios"

export default function AdminStripeConnectSetup() {
    const [connectId, setConnectId] = useState("")
    const [onboardingLink, setOnboardingLink] = useState("")
    const [completedSteps, setCompletedSteps] = useState([])
    const [loadingSteps, setLoadingSteps] = useState([])

    useEffect(() => {
        const getAccountStatus = async (id) => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.post(`${Backendurl}/api/admin/get/account-status`,
                    {
                        connectId: id,
                        // connectId: 'acct_1Rs9n4KHRYyguRp1'
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                if (response.data.isActivated) {
                    setCompletedSteps([1, 2, 3]);
                }
            } catch (error) {
                console.error('Error Occured', error);
                const errorMessage = error.response?.data?.message || 'Error getting stripe account status';
                toast.error(errorMessage);
            } finally {
                setLoadingSteps([]);
            }
        }

        const getStripeData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error('Please login to proceed further');
                    return;
                }

                try {
                    const response = await axios.get(`${Backendurl}/api/admin/get/connect-id`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data.success && response.data.connectId) {
                        setConnectId(response.data.connectId);
                        setCompletedSteps([1]);
                        await getAccountStatus(response.data.connectId)
                    }
                } catch (error) {
                    console.error('Error Occured', error);
                    const errorMessage = error.response?.data?.message || 'Error generating Connect ID';
                    toast.error(errorMessage);
                } finally {
                    setLoadingSteps([]);
                }
            } catch (error) {

            }
        }

        getStripeData()
    }, [])

    const generateConnectId = async () => {
        setLoadingSteps([1]);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to schedule a viewing');
            return;
        }

        try {
            const response = await axios.get(`${Backendurl}/api/admin/generate/connect-Id`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                setConnectId(response.data.connectId);
                setCompletedSteps([1]);
            } else {
                toast.error(response.data.message || 'Failed to generate Connect ID');
            }
        } catch (error) {
            console.error('Scheduling error:', error);
            const errorMessage = error.response?.data?.message || 'Error generating Connect ID';
            toast.error(errorMessage);
        } finally {
            setLoadingSteps([]);
        }
    };


    const generateOnboardingLink = async () => {
        setLoadingSteps([2]);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login generate url');
            return;
        }

        try {
            const response = await axios.post(`${Backendurl}/api/admin/generate/onboarding-url`,
                {
                    connectId: connectId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

            if (response.data.success) {
                setOnboardingLink(response.data.onboardingLink);
                setCompletedSteps([1, 2]);
            } else {
                toast.error(response.data.message || 'Failed to generate Onboarding url');
            }
        } catch (error) {
            console.error('Onboarding error:', error);
            const errorMessage = error.response?.data?.message || 'Error generating Onboarding url';
            toast.error(errorMessage);
        } finally {
            setLoadingSteps([]);
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
    }

    const isStepCompleted = (step) => completedSteps.includes(step)
    const isStepLoading = (step) => loadingSteps.includes(step)

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Main Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Header */}
                <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-center text-gray-900">Setup your Stripe account</h1>
                    <p className="text-gray-600 text-center">Follow these steps to connect your Stripe account to our platform</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Step 1: Generate Connect ID */}
                    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex-shrink-0">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isStepCompleted(1) ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
                                    }`}
                            >
                                {isStepCompleted(1) ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    "1"
                                )}
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">Generate Connect ID</h3>
                                <p className="text-sm text-gray-600">
                                    Create a unique Connect account identifier for your Stripe integration
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                {connectId && (
                                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded border border-gray-300 flex-1">
                                        <code className="text-sm font-mono text-gray-800 flex-1 truncate">{connectId}</code>
                                        <button
                                            onClick={() => copyToClipboard(connectId)}
                                            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={generateConnectId}
                                    disabled={isStepCompleted(1) || isStepLoading(1)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${isStepCompleted(1) || isStepLoading(1)
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        }`}
                                >
                                    {isStepLoading(1) ? "Generating..." : "Generate Connect ID"}
                                </button>
                            </div>

                            {isStepCompleted(1) && (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Step 1 Completed
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Generate Onboarding Link */}
                    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                        <div className="flex-shrink-0">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isStepCompleted(2)
                                    ? "bg-green-500 text-white"
                                    : isStepCompleted(1)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-gray-700"
                                    }`}
                            >
                                {isStepCompleted(2) ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    "2"
                                )}
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">Generate Onboarding Link</h3>
                                <p className="text-sm text-gray-600">Create a secure link to complete your Stripe account setup</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                {onboardingLink && (
                                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded border border-gray-300 flex-1 max-w-80">
                                        <code className="text-sm font-mono text-gray-800 flex-1 truncate">{onboardingLink}</code>
                                        <button
                                            onClick={() => copyToClipboard(onboardingLink)}
                                            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 transition-colors"
                                            title="Copy to clipboard"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => window.open(onboardingLink, "_blank")}
                                            className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 transition-colors"
                                            title="Open link"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={generateOnboardingLink}
                                    disabled={!isStepCompleted(1) || isStepCompleted(2) || isStepLoading(2)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${!isStepCompleted(1) || isStepCompleted(2) || isStepLoading(2)
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        }`}
                                >
                                    {isStepLoading(2) ? "Generating..." : "Generate Link"}
                                </button>
                            </div>

                            {isStepCompleted(2) && (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Step 2 Completed
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 3: Complete Setup */}
                    <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex-shrink-0">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isStepCompleted(3)
                                    ? "bg-green-500 text-white"
                                    : isStepCompleted(2)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-gray-700"
                                    }`}
                            >
                                {isStepCompleted(3) ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    "3"
                                )}
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div>
                                <h3 className="font-semibold text-gray-900">Complete Setup</h3>
                                <p className="text-sm text-gray-600">
                                    Finalize your Stripe Connect integration and activate your account
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    disabled={!isStepCompleted(2) || isStepCompleted(3) || isStepLoading(3)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-shrink-0 ${!isStepCompleted(2) || isStepCompleted(3) || isStepLoading(3)
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        }`}
                                >
                                    <a href={onboardingLink}>Complete Setup</a>
                                </button>
                            </div>

                            {isStepCompleted(3) && (
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Setup Complete!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Success Message */}
                    {isStepCompleted(3) && (
                        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                            <h3 className="font-semibold text-green-800">🎉 Stripe Connect Setup Complete!</h3>
                            <p className="text-sm text-green-600 mt-1">
                                Your Stripe account is now successfully connected to our platform.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
