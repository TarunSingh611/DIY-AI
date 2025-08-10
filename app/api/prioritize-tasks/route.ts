import { NextRequest, NextResponse } from 'next/server';
import { generateTaskPriorities } from '@/utils/gemini';

export async function POST(request: NextRequest) {
  try {
    const { tasks } = await request.json();

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { error: 'No tasks provided' },
        { status: 400 }
      );
    }

    const priorities = await generateTaskPriorities(tasks);

    return NextResponse.json({ priorities });
  } catch (error) {
    console.error('Task prioritization error:', error);
    return NextResponse.json(
      { error: 'Failed to prioritize tasks' },
      { status: 500 }
    );
  }
}
