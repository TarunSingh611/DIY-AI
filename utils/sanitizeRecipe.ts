// Recipe parsing utility function
export function parseAndSanitizeRecipe(text: string) {

    const lines = text.split('\n').filter(line => line.trim());
    
    let title = '';
    let ingredients: string[] = [];
    let instructions: string[] = [];
    let cookingTime = '';
    let difficulty = 'medium';

    let currentSection = '';
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (!trimmedLine) continue;
        
        // Detect title (ends with semicolon)
        if (trimmedLine.endsWith(';') && !title) {
            title = trimmedLine.replace(/;$/, '').trim();
            continue;
        }
        
        // Detect sections
        if (trimmedLine.toLowerCase().includes('**ingredients:**')) {
            currentSection = 'ingredients';
            continue;
        } else if (trimmedLine.toLowerCase().includes('**instructions:**')) {
            currentSection = 'instructions';
            continue;
        } else if (trimmedLine.toLowerCase().includes('**total cooking time:**')) {
            currentSection = 'time';
            continue;
        } else if (trimmedLine.toLowerCase().includes('**difficulty level:**')) {
            currentSection = 'difficulty';
            continue;
        }
        
        // Process content based on current section
        switch (currentSection) {
            case 'ingredients':
                // Handle ingredients with asterisks or dashes
                if (trimmedLine.startsWith('*') || trimmedLine.startsWith('-')) {
                    const ingredient = trimmedLine.replace(/^[\*\-]\s*/, '').trim();
                    if (ingredient && !ingredient.toLowerCase().includes('ingredients')) {
                        ingredients.push(ingredient);
                    }
                }
                break;
                
            case 'instructions':
                // Handle numbered instructions
                if (trimmedLine.match(/^\d+\./)) {
                    const instruction = trimmedLine.replace(/^\d+\.\s*/, '').trim();
                    if (instruction) {
                        instructions.push(instruction);
                    }
                }
                break;
                
            case 'time':
                // Extract cooking time number
                const timeMatch = trimmedLine.match(/(\d+)/);
                if (timeMatch) {
                    cookingTime = timeMatch[1];
                }
                break;
                
            case 'difficulty':
                // Extract difficulty level
                if (trimmedLine.toLowerCase().includes('easy')) {
                    difficulty = 'easy';
                } else if (trimmedLine.toLowerCase().includes('hard')) {
                    difficulty = 'hard';
                } else if (trimmedLine.toLowerCase().includes('medium')) {
                    difficulty = 'medium';
                }
                break;
        }
    }

    // Fallback parsing if structured parsing didn't work
    if (!title && lines.length > 0) {
        const firstLine = lines[0].trim();
        if (firstLine.endsWith(';')) {
            title = firstLine.replace(/;$/, '').trim();
        } else {
            title = firstLine;
        }
    }

    // Clean up ingredients - remove any section headers that might have been captured
    ingredients = ingredients.filter(ingredient => 
        !ingredient.toLowerCase().includes('ingredients') &&
        !ingredient.toLowerCase().includes('instructions') &&
        ingredient.trim().length > 0
    );

    // Clean up instructions - remove any section headers that might have been captured
    instructions = instructions.filter(instruction => 
        !instruction.toLowerCase().includes('ingredients') &&
        !instruction.toLowerCase().includes('instructions') &&
        instruction.trim().length > 0
    );

    // Generate fallbacks if parsing failed
    if (ingredients.length === 0) {
        ingredients = ['Ingredients will be listed here'];
    }

    if (instructions.length === 0) {
        instructions = ['Instructions will be listed here'];
    }

    if (!cookingTime) {
        cookingTime = '30';
    }

    if (!title) {
        title = 'Generated Recipe';
    }
    return {
        id: Date.now().toString(),
        title: title,
        ingredients: ingredients,
        instructions: instructions,
        cookingTime: cookingTime,
        difficulty: difficulty,
        createdAt: new Date().toISOString()
    };
}