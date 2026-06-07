import React from 'react';
import { ALL_INDIAN_CRAFT_STORIES } from '../data/craftStories';

export default function CraftStatsDisplay() {
    // Calculate statistics
    const totalStates = ALL_INDIAN_CRAFT_STORIES.length;
    const regions = [...new Set(ALL_INDIAN_CRAFT_STORIES.map(story => story.region))];
    const totalCrafts = ALL_INDIAN_CRAFT_STORIES.reduce((acc, story) => acc + story.crafts.length, 0);

    // Group by regions
    const regionStats = regions.map(region => ({
        name: region,
        count: ALL_INDIAN_CRAFT_STORIES.filter(story => story.region === region).length,
        states: ALL_INDIAN_CRAFT_STORIES.filter(story => story.region === region).map(s => s.state)
    }));

    return (
        <div className="bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#722F37] rounded-3xl p-8 text-white">
            <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">🇮🇳 Complete Coverage</h3>
                <p className="text-white/90">Comprehensive collection of Indian craft heritage</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Total States */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
                        🏛️
                    </div>
                    <div className="text-4xl font-bold mb-2">{totalStates}</div>
                    <div className="text-white/80">States & UTs Covered</div>
                </div>

                {/* Total Crafts */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
                        🎨
                    </div>
                    <div className="text-4xl font-bold mb-2">{totalCrafts}+</div>
                    <div className="text-white/80">Traditional Crafts</div>
                </div>

                {/* Regions */}
                <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto">
                        🗺️
                    </div>
                    <div className="text-4xl font-bold mb-2">{regions.length}</div>
                    <div className="text-white/80">Geographic Regions</div>
                </div>
            </div>

            {/* Regional Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionStats.map((region, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <h4 className="font-bold text-lg mb-2">{region.name}</h4>
                        <p className="text-white/80 text-sm mb-3">{region.count} states covered</p>
                        <div className="flex flex-wrap gap-1">
                            {region.states.slice(0, 3).map((state, idx) => (
                                <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {state.split(' ')[0]}
                                </span>
                            ))}
                            {region.states.length > 3 && (
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                    +{region.states.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8 pt-6 border-t border-white/20">
                <p className="text-white/90 text-lg">
                    🌟 Every state, every craft, every story - preserving India's complete cultural heritage
                </p>
            </div>
        </div>
    );
}