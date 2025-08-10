"use client";
import { useState, createContext, useContext, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generateRecipe } from '@/utils/gemini';
import { ArrowLeft, Search, Filter, Trash2, Plus, ChefHat, X } from 'lucide-react';
import Link from 'next/link';

interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
    cookingTime: string;
    difficulty: string;
    createdAt: string;
}

interface RecipeContextType {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
    searchQuery: string;
    filterOptions: {
        difficulty: string;
        cookingTime: string;
    };
    filteredRecipes: Recipe[];
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
    addRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    clearRecipes: () => void;
    updateFilterOptions: (options: Partial<{ difficulty: string; cookingTime: string }>) => void;
}

const RecipeContext = createContext<RecipeContextType | null>(null);

const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};

const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        difficulty: 'all',
        cookingTime: 'all',
    });

    const filteredRecipes = useMemo(() => {
        let filtered = recipes;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(query) ||
                recipe.ingredients.some(ingredient =>
                    ingredient.toLowerCase().includes(query)
                )
            );
        }

        if (filterOptions.difficulty !== 'all') {
            filtered = filtered.filter(recipe =>
                recipe.difficulty === filterOptions.difficulty
            );
        }

        if (filterOptions.cookingTime !== 'all') {
            filtered = filtered.filter(recipe => {
                const time = parseInt(recipe.cookingTime);
                switch (filterOptions.cookingTime) {
                    case 'quick':
                        return time <= 30;
                    case 'medium':
                        return time > 30 && time <= 60;
                    case 'long':
                        return time > 60;
                    default:
                        return true;
                }
            });
        }

        return filtered;
    }, [recipes, searchQuery, filterOptions]);

    const addRecipe = (recipe: Recipe) => {
        setRecipes(prev => [recipe, ...prev]);
    };

    const deleteRecipe = (id: string) => {
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    };

    const clearRecipes = () => {
        setRecipes([]);
    };

    const updateFilterOptions = (newOptions: Partial<{ difficulty: string; cookingTime: string }>) => {
        setFilterOptions(prev => ({ ...prev, ...newOptions }));
    };

    const value = {
        recipes,
        loading,
        error,
        searchQuery,
        filterOptions,
        filteredRecipes,
        setLoading,
        setError,
        setSearchQuery,
        addRecipe,
        deleteRecipe,
        clearRecipes,
        updateFilterOptions,
    };

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    );
};

// Search Bar Component
const SearchBar = () => {
    const { addRecipe, setLoading, setError, recipes } = useRecipes();

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [error, setLocalError] = useState('');

    const suggestions = [
        'chicken', 'beef', 'pork', 'fish', 'shrimp', 'eggs', 'milk', 'cheese',
        'tomatoes', 'onions', 'garlic', 'potatoes', 'carrots', 'broccoli',
        'rice', 'pasta', 'bread', 'flour', 'sugar', 'butter', 'olive oil'
    ];

    const handleAddIngredient = () => {
        if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
            setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
            setCurrentIngredient('');
            setLocalError('');
        }
    };

    const handleDeleteIngredient = (ingredientToDelete: string) => {
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToDelete));
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (!ingredients.includes(suggestion)) {
            setIngredients([...ingredients, suggestion]);
        }
    };

    const handleClearAll = () => {
        setIngredients([]);
        setCurrentIngredient('');
        setLocalError('');
    };

    const handleCopyAllRecipes = async () => {
        if (recipes.length === 0) {
            alert('No recipes to copy!');
            return;
        }

        const allRecipesText = recipes.map(recipe => `
            ${recipe.title}

            INGREDIENTS:
            ${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

            INSTRUCTIONS:
            ${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

            Cooking Time: ${recipe.cookingTime} minutes
            Difficulty: ${recipe.difficulty}

            ${'='.repeat(50)} `).join('\n\n');

        try {
            await navigator.clipboard.writeText(allRecipesText);
            alert(`All ${recipes.length} recipes copied to clipboard!`);
        } catch (err) {
            console.error('Failed to copy recipes:', err);
            alert('Failed to copy recipes. Please try again.');
        }
    };

    const handleGenerateRecipe = async () => {
        if (ingredients.length === 0) {
            setLocalError('Please add at least one ingredient');
            return;
        }

        setLoading(true);
        setLocalError('');

        try {
            const recipe = await generateRecipe(ingredients);
            addRecipe(recipe);
        } catch (err: any) {
            console.error('Recipe generation error:', err);
            setLocalError(err.message || 'Failed to generate recipe');
            setError(err.message || 'Failed to generate recipe');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddIngredient();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-black mb-6 text-center">
                Generate AI Recipe
            </h2>

            {/* Ingredients Input */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-2">
                    Ingredients
                </label>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add an ingredient..."
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                    />
                    <button
                        onClick={handleAddIngredient}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* Ingredients Chips */}
                {ingredients.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {ingredients.map((ingredient, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm border border-green-200"
                                >
                                    {ingredient}
                                    <button
                                        onClick={() => handleDeleteIngredient(ingredient)}
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Suggestions */}
                <div className="mb-4">
                    <p className="text-sm text-black mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.slice(0, 8).map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors text-black"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
                <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <X className="w-4 h-4" />
                    Clear All
                </button>

                <button
                    onClick={handleGenerateRecipe}
                    className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    <ChefHat className="w-4 h-4" />
                    Generate Recipe
                </button>

                {recipes.length > 0 && (
                    <button
                        onClick={handleCopyAllRecipes}
                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy All ({recipes.length})
                    </button>
                )}
            </div>
        </div>
    );
};

// Recipe Card Component
const RecipeCard = ({ recipe, onDelete }: { recipe: Recipe; onDelete: (id: string) => void }) => {
    const handleCopyRecipe = async () => {
        const recipeText = `
${recipe.title}

INGREDIENTS:
${recipe.ingredients.map(ingredient => `• ${ingredient}`).join('\n')}

INSTRUCTIONS:
${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

Cooking Time: ${recipe.cookingTime} minutes
Difficulty: ${recipe.difficulty}
    `.trim();

        try {
            await navigator.clipboard.writeText(recipeText);
            // You could add a toast notification here if you want
            alert('Recipe copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy recipe:', err);
            alert('Failed to copy recipe. Please try again.');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-black">{recipe.title}</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={handleCopyRecipe}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Copy recipe"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => onDelete(recipe.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete recipe"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 mb-4 text-sm text-black">
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {recipe.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {recipe.cookingTime} min
                    </span>
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold text-black mb-2">Ingredients:</h4>
                    <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <ul className="text-sm text-black space-y-1">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>• {ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-black mb-2">Instructions:</h4>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                        <ol className="text-sm text-black space-y-2">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="pb-2">
                                    <span className="font-medium text-green-600">{index + 1}.</span> {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Recipe List Component
const RecipeList = () => {
    const { filteredRecipes, loading, deleteRecipe } = useRecipes();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (filteredRecipes.length === 0) {
        return (
            <div className="text-center py-12">
                <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-black mb-2">No recipes yet</h3>
                <p className="text-black">Add some ingredients and generate your first recipe!</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onDelete={deleteRecipe} />
            ))}
        </div>
    );
};

// Main Recipe Generator Page Component
export default function RecipeGeneratorPage() {
    return (
        <RecipeProvider>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                <Head>
                    <title>Recipe Generator - DIY_AI</title>
                    <meta name="description" content="Create delicious recipes from your available ingredients" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Header />

                <main>
                    {/* Back Button */}
                    <section className="pt-8 pb-4">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors duration-200 mb-4 inline-block"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to App Selection
                            </Link>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section className="py-8 lg:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto text-center">
                                <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                                    AI Recipe Generator
                                </h1>
                                <p className="text-xl text-black max-w-2xl mx-auto">
                                    Transform your available ingredients into delicious recipes with AI-powered cooking assistance.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Main Content */}
                    <section className="py-16 lg:py-24">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-6xl mx-auto">
                                <SearchBar />
                                <RecipeList />
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </RecipeProvider>
    );
}
