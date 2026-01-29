import React, { useState } from 'react';

interface JoinFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const JoinFormModal: React.FC<JoinFormModalProps> = ({ isOpen, onClose }) => {
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg bg-[#39FF14] text-black rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-[#39FF14] transition-colors font-bold text-xl"
                >
                    ✕
                </button>

                {!submitted ? (
                    <>
                        <h2 className="text-5xl heading-font mb-4 text-center">JOIN THE FAM</h2>
                        <p className="body-font font-bold mb-8 text-center uppercase tracking-wide opacity-80">
                            Get exclusive drops, secret menu access, and invites to members-only sessions.
                        </p>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSubmitted(true);
                            }}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest mb-2 ml-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white border-4 border-black p-4 rounded-xl font-bold uppercase placeholder-gray-400 focus:outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                                    placeholder="AKA..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest mb-2 ml-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white border-4 border-black p-4 rounded-xl font-bold uppercase placeholder-gray-400 focus:outline-none focus:translate-x-1 focus:-translate-y-1 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                                    placeholder="YOU@EXAMPLE.COM"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-black text-white p-5 rounded-xl text-xl font-black uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                                >
                                    Sign Me Up
                                </button>
                            </div>

                            <p className="text-[10px] text-center font-bold uppercase opacity-60 mt-4">
                                By joining, you confirm you are 21+ and agree to receive marketing emails. No spam, just gas.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="text-6xl mb-6">🔥</div>
                        <h2 className="text-4xl heading-font mb-4">YOU'RE IN</h2>
                        <p className="font-bold text-lg mb-8 uppercase">
                            Welcome to the inner circle. check your email for a welcome gift.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-black text-white font-black rounded-xl uppercase hover:scale-105 transition-all"
                        >
                            LFG
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
