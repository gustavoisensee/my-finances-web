import { useState, useEffect, useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useParams } from 'react-router-dom';

import { Budget, Income } from '@/types/month';
import { reorderBudgets } from '@/services/budget';
import { reorderIncomes } from '@/services/income';

const sortByIndex = <T extends { index?: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
};

export const useReorderBudgets = (budgets: Budget[]) => {
  const { id } = useParams<{ id: string }>();
  const monthId = Number(id);

  const [orderedBudgets, setOrderedBudgets] = useState<Budget[]>(() => 
    sortByIndex(budgets)
  );

  // Sync with props when budgets change (e.g., after add/edit/delete)
  useEffect(() => {
    setOrderedBudgets(sortByIndex(budgets));
  }, [budgets]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    setOrderedBudgets((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      if (oldIndex === -1 || newIndex === -1) return items;

      const reordered = arrayMove(items, oldIndex, newIndex);
      
      // Update indexes and call API (fire-and-forget)
      const budgetIds = reordered
        .map((item) => item.id)
        .filter((id): id is number => id !== undefined);
      
      reorderBudgets(monthId, budgetIds).catch((error) => {
        console.error('Failed to reorder budgets:', error);
      });

      // Return reordered items with updated indexes
      return reordered.map((item, index) => ({ ...item, index }));
    });
  }, [monthId]);

  return {
    orderedBudgets,
    handleDragEnd,
  };
};

export const useReorderIncomes = (incomes: Income[]) => {
  const { id } = useParams<{ id: string }>();
  const monthId = Number(id);

  const [orderedIncomes, setOrderedIncomes] = useState<Income[]>(() => 
    sortByIndex(incomes)
  );

  // Sync with props when incomes change (e.g., after add/edit/delete)
  useEffect(() => {
    setOrderedIncomes(sortByIndex(incomes));
  }, [incomes]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    setOrderedIncomes((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      if (oldIndex === -1 || newIndex === -1) return items;

      const reordered = arrayMove(items, oldIndex, newIndex);
      
      // Update indexes and call API (fire-and-forget)
      const incomeIds = reordered
        .map((item) => item.id)
        .filter((id): id is number => id !== undefined);
      
      reorderIncomes(monthId, incomeIds).catch((error) => {
        console.error('Failed to reorder incomes:', error);
      });

      // Return reordered items with updated indexes
      return reordered.map((item, index) => ({ ...item, index }));
    });
  }, [monthId]);

  return {
    orderedIncomes,
    handleDragEnd,
  };
};

