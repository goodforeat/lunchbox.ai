import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

type ShoppingItem = {
  name: string;
  meta: string;
  checked: boolean;
};

type MealCardData = {
  icon: React.ComponentProps<typeof Feather>['name'];
  title: string;
  subtitle: string;
  servings: string;
  ingredients?: string[];
  steps?: string[];
};

const SHOPPING_ITEMS: ShoppingItem[] = [
  { name: 'Chicken breast', meta: '500g · Protein', checked: true },
  { name: 'Quinoa', meta: '200g · Grains', checked: false },
  { name: 'Bell peppers', meta: '3 pcs · Vegetables', checked: false },
  { name: 'Fresh herbs (thyme, rosemary)', meta: '1 bunch · Herbs', checked: false },
  { name: 'Lemon', meta: '2 pcs · Citrus', checked: false },
];

const MEALS: MealCardData[] = [
  {
    icon: 'coffee',
    title: 'Overnight Oats',
    subtitle: '10 min cooking',
    servings: '1/1',
    ingredients: [
      'Rolled oats — 80g',
      'Mixed berries — 100g',
      'Almond milk — 200ml · Honey to taste',
    ],
    steps: [
      'Bring almond milk to a gentle simmer',
      'Stir in oats and cook for 5 minutes',
      'Top with mixed berries and a drizzle of honey',
    ],
  },
  {
    icon: 'box',
    title: 'Grilled Chicken Bowl',
    subtitle: '3 min microwaving',
    servings: '3/4',
  },
  {
    icon: 'coffee',
    title: 'Thai Green Curry Chicken',
    subtitle: '25 min cooking',
    servings: '1/4',
    ingredients: [
      'Thai green curry paste — 3 tbsp',
      'Chicken thighs — 500g',
      'Coconut milk — 400ml',
      'Thai basil — 1 handful',
    ],
    steps: [
      'Heat oil in pan, fry curry paste for 2 minutes',
      'Add chicken, cook until sealed on all sides',
      'Pour in coconut milk, simmer for 15 minutes',
      'Stir in Thai basil and serve',
    ],
  },
];

function ShoppingListCard() {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState(SHOPPING_ITEMS);

  const checkedCount = items.filter((i) => i.checked).length;
  const total = items.length;
  const progress = (checkedCount / total) * 100;

  const toggleItem = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <View style={styles.cardHeaderLeft}>
          <View style={styles.iconBg}>
            <Feather name="shopping-cart" size={18} color="#71717A" />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.cardTitle}>Shopping List</Text>
            <Text style={styles.cardSubtitle}>
              {total} items · {checkedCount} checked
            </Text>
          </View>
        </View>
        <Feather
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#71717A"
        />
      </TouchableOpacity>

      {expanded && (
        <>
          <View style={styles.divider} />
          <View>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  style={styles.shoppingRow}
                  onPress={() => toggleItem(index)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.checked && styles.checkboxChecked,
                    ]}
                  >
                    {item.checked && (
                      <Feather name="check" size={14} color="#FFFFFF" />
                    )}
                  </View>
                  <View style={styles.shoppingInfo}>
                    <Text
                      style={[
                        styles.shoppingName,
                        item.checked && styles.shoppingNameChecked,
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.shoppingMeta}>{item.meta}</Text>
                  </View>
                </TouchableOpacity>
                {index < items.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={styles.progressLabel}>
                {checkedCount} of {total} completed
              </Text>
              <Text style={styles.progressPct}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
}

function MealCard({ meal }: { meal: MealCardData }) {
  const isCooking = meal.subtitle.includes('cooking');
  const [expanded, setExpanded] = useState(false);

  const HeaderWrapper = isCooking ? TouchableOpacity : View;

  return (
    <View style={styles.card}>
      <HeaderWrapper
        style={styles.cardHeader}
        {...(isCooking && { onPress: () => setExpanded(!expanded) })}
      >
        <View style={styles.cardHeaderLeft}>
          <View style={styles.iconBg}>
            <Feather name={meal.icon} size={18} color="#71717A" />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.cardTitle}>{meal.title}</Text>
            <Text style={styles.cardSubtitle}>{meal.subtitle}</Text>
            <Text style={styles.cardSubtitle}>{meal.servings}</Text>
          </View>
        </View>
        {isCooking && (
          <Feather
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#71717A"
          />
        )}
      </HeaderWrapper>

      {isCooking && expanded && meal.ingredients && meal.steps && (
        <>
          <View style={styles.divider} />
          <View style={styles.recipeContent}>
            <Text style={styles.recipeHeading}>Ingredients</Text>
            {meal.ingredients.map((ing, i) => (
              <Text key={i} style={styles.recipeText}>
                • {ing}
              </Text>
            ))}
            <Text style={[styles.recipeHeading, { marginTop: 10 }]}>
              Steps
            </Text>
            {meal.steps.map((step, i) => (
              <Text key={i} style={styles.recipeText}>
                {i + 1}. {step}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Bar spacer */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>9:41</Text>
          <View style={styles.statusIcons}>
            <Feather name="bar-chart-2" size={16} color="#3F3F46" />
            <Feather name="wifi" size={16} color="#3F3F46" />
            <Feather name="battery" size={16} color="#3F3F46" />
          </View>
        </View>

        {/* Shopping List */}
        <ShoppingListCard />

        {/* Today's Meal Prep */}
        <View style={styles.mealSection}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealTitle}>Today's meal prep</Text>
            <Text style={styles.mealKcal}>1,280 kcal</Text>
          </View>
          {MEALS.map((meal, index) => (
            <MealCard key={index} meal={meal} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 110,
    gap: 32,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    paddingHorizontal: 0,
  },
  statusTime: {
    fontSize: 17,
    fontWeight: '600',
    color: '#3F3F46',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { x: 0, y: 1 } as any,
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    gap: 2,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3F3F46',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#71717A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E7',
    width: '100%',
  },
  shoppingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3F3F46',
    borderColor: '#3F3F46',
  },
  shoppingInfo: {
    flex: 1,
    gap: 2,
  },
  shoppingName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3F3F46',
  },
  shoppingNameChecked: {
    color: '#A1A1AA',
  },
  shoppingMeta: {
    fontSize: 13,
    color: '#A1A1AA',
  },
  progressSection: {
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: '#71717A',
  },
  progressPct: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717A',
  },
  progressBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E4E4E7',
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3F3F46',
  },
  mealSection: {
    gap: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3F3F46',
  },
  mealKcal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#71717A',
  },
  recipeContent: {
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  recipeHeading: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3F3F46',
  },
  recipeText: {
    fontSize: 13,
    color: '#52525B',
  },
});
