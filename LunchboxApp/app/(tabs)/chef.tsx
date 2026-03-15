import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// ─── Types ────────────────────────────────────────────────────────────────────
type FlowStep = 'input' | 'suggestions' | 'loading' | 'portions' | 'recipe' | 'calendar';

// ─── Static Data ──────────────────────────────────────────────────────────────
const CHIP_ROW1 = [
  { label: 'Pasta',   icon: 'package' as const },
  { label: 'Salad',   icon: 'feather' as const },
  { label: 'Salmon',  icon: 'anchor'  as const },
];
const CHIP_ROW2 = [
  { label: 'Omelette', icon: 'circle' as const },
  { label: 'Sandwich', icon: 'layers' as const },
];

const SUGGESTION_RECIPES = [
  { id: 1, title: 'Spaghetti Bolognese', time: '30 min', kcal: '620 kcal' },
  { id: 2, title: 'Caesar Salad',        time: '15 min', kcal: '320 kcal' },
  { id: 3, title: 'Avocado Toast',       time: '10 min', kcal: '280 kcal' },
  { id: 4, title: 'Tom Yum Soup',        time: '25 min', kcal: '180 kcal' },
  { id: 5, title: 'Grilled Salmon',      time: '20 min', kcal: '450 kcal' },
  { id: 6, title: 'Veggie Stir-Fry',    time: '15 min', kcal: '310 kcal' },
  { id: 7, title: 'Chicken Tikka',       time: '35 min', kcal: '520 kcal' },
  { id: 8, title: 'Mushroom Risotto',    time: '40 min', kcal: '480 kcal' },
];

const PORTION_OPTIONS = [
  { count: 2, label: '2 portions' },
  { count: 3, label: '3 portions' },
  { count: 4, label: '4 portions' },
];

const RECIPE = {
  title: 'Thai Green Curry Chicken',
  time: '35 min',
  kcal: '550 kcal',
  difficulty: 'Medium',
  cuisine: 'Thai',
  shopping: [
    'Thai green curry paste — 3 tbsp',
    'Coconut milk — 400 ml',
    'Thai basil — 1 handful',
  ],
  ingredients: [
    'Chicken thighs — 500 g',
    'Thai green curry paste — 3 tbsp',
    'Coconut milk — 400 ml',
    'Fish sauce — 2 tbsp',
    'Palm sugar — 1 tsp',
    'Thai basil — 1 handful',
    'Kaffir lime leaves — 4 leaves',
  ],
  steps: [
    'Cut chicken thighs into bite-sized pieces.',
    'Heat oil in a wok over medium-high heat.',
    'Fry curry paste for 2 minutes until fragrant.',
    'Add chicken and cook until sealed on all sides.',
    'Pour in coconut milk and bring to a simmer.',
    'Season with fish sauce and palm sugar.',
    'Stir in Thai basil and kaffir lime leaves, then serve.',
  ],
};

const WEEK_DAYS = [
  { day: 'SAT', date: '14' },
  { day: 'SUN', date: '15' },
  { day: 'MON', date: '16' },
  { day: 'TUE', date: '17' },
  { day: 'WED', date: '18' },
  { day: 'THU', date: '19' },
  { day: 'FRI', date: '20' },
];

const MEAL_SLOTS = ['Breakfast', 'Lunch', 'Dinner'];

// ─── Flow 1: Food Input ───────────────────────────────────────────────────────
function FlowInput({ onSearch, onSuggestions }: { onSearch: () => void; onSuggestions: () => void }) {
  const [query, setQuery] = useState('');

  const renderChipRow = (chips: typeof CHIP_ROW1) => (
    <View style={styles.chipRow}>
      {chips.map((chip) => (
        <TouchableOpacity
          key={chip.label}
          style={styles.chip}
          onPress={() => { setQuery(chip.label); onSearch(); }}
        >
          <Feather name={chip.icon} size={14} color="#3F3F46" />
          <Text style={styles.chipLabel}>{chip.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <View style={styles.statusIcons}>
          <Feather name="bar-chart-2" size={16} color="#3F3F46" />
          <Feather name="wifi" size={16} color="#3F3F46" />
          <Feather name="battery" size={16} color="#3F3F46" />
        </View>
      </View>

      {/* Centered content */}
      <View style={styles.inputContent}>
        <View style={styles.searchSection}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#A1A1AA" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search or paste a link"
              placeholderTextColor="#A1A1AA"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={onSearch}
              returnKeyType="search"
            />
          </View>

          {/* Suggestions label */}
          <Text style={styles.sectionLabel}>POPULAR SUGGESTIONS</Text>

          {/* Chip rows */}
          {renderChipRow(CHIP_ROW1)}
          {renderChipRow(CHIP_ROW2)}
        </View>
      </View>

      {/* FAB — always above tab bar */}
      <TouchableOpacity style={styles.fabFloat} onPress={onSuggestions}>
        <Feather name="zap" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── Flow After Suggestions ───────────────────────────────────────────────────
function FlowSuggestions({ onBack, onSelect }: { onBack: () => void; onSelect: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#3F3F46" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>AI Suggestions</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.recipesGrid}>
          {SUGGESTION_RECIPES.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={[styles.recipeCard, selected === r.id && styles.recipeCardSelected]}
              onPress={() => setSelected(r.id)}
              activeOpacity={0.8}
            >
              <View style={styles.recipeImgPlaceholder}>
                <Feather name="image" size={28} color="#A1A1AA" />
              </View>
              <View style={styles.recipeCardBody}>
                <Text style={styles.recipeCardTitle} numberOfLines={2}>{r.title}</Text>
                <View style={styles.recipeCardMeta}>
                  <Feather name="clock" size={11} color="#A1A1AA" />
                  <Text style={styles.recipeCardMetaText}>{r.time}</Text>
                  <Text style={styles.recipeCardMetaText}> · {r.kcal}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.ctaBar}>
        <TouchableOpacity
          style={[styles.ctaBtn, !selected && styles.ctaBtnDisabled]}
          onPress={selected ? onSelect : undefined}
        >
          <Text style={styles.ctaBtnText}>View All Recipes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Flow 2: Loading ──────────────────────────────────────────────────────────
function FlowLoading({ onDone }: { onDone: () => void }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.15, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1,    duration: 700, useNativeDriver: true }),
      ])
    );
    anim.start();
    const timer = setTimeout(onDone, 2500);
    return () => { anim.stop(); clearTimeout(timer); };
  }, []);

  return (
    <SafeAreaView style={[styles.container, styles.centerContent]}>
      <Animated.View style={[styles.sparkleCircle, { transform: [{ scale: pulse }] }]}>
        <Feather name="zap" size={36} color="#52525B" />
      </Animated.View>
      <Text style={styles.loadingTitle}>Generating your meal...</Text>
      <Text style={styles.loadingSubtitle}>AI is crafting the perfect recipe</Text>

      <View style={styles.skeletons}>
        {[100, 85, 95, 70].map((w, i) => (
          <View key={i} style={[styles.skeletonBar, { width: `${w}%` as any }]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─── Flow 3: Portions ─────────────────────────────────────────────────────────
function FlowPortions({ onBack, onNext }: { onBack: () => void; onNext: (p: number) => void }) {
  const [selected, setSelected] = useState(3);

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusTime}>9:41</Text>
        <View style={styles.statusIcons}>
          <Feather name="bar-chart-2" size={16} color="#3F3F46" />
          <Feather name="wifi" size={16} color="#3F3F46" />
          <Feather name="battery" size={16} color="#3F3F46" />
        </View>
      </View>

      {/* Header Bar: title on left, back button on right */}
      <View style={styles.portionHeader}>
        <View style={styles.portionHeaderLeft}>
          <Text style={styles.portionHeaderTitle}>How many portions?</Text>
          <Text style={styles.portionHeaderSub}>Thai Green Curry Chicken</Text>
        </View>
        <TouchableOpacity style={styles.circleBackBtn} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#3F3F46" />
        </TouchableOpacity>
      </View>

      {/* Centered content — paddingBottom offsets the floating FAB visual footprint */}
      <View style={[styles.inputContent, { paddingBottom: 166 }]}>
        <View style={styles.portionSection}>
          <Text style={styles.sectionLabel}>SELECT PORTIONS</Text>

          {/* Portion cards row */}
          <View style={styles.portionCardRow}>
            {PORTION_OPTIONS.map((p) => {
              const isSelected = selected === p.count;
              return (
                <TouchableOpacity
                  key={p.count}
                  style={[styles.portionCard, isSelected && styles.portionCardSelected]}
                  onPress={() => setSelected(p.count)}
                >
                  <Text style={[styles.portionCount, isSelected && styles.portionCountSelected]}>
                    {p.count}
                  </Text>
                  <Text style={[styles.portionLabel, isSelected && styles.portionLabelSelected]}>
                    portions
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Info box */}
          <View style={styles.infoBox}>
            <Feather name="info" size={18} color="#52525B" />
            <Text style={styles.infoText}>
              Min. 2 portions based on supermarket pack sizes
            </Text>
          </View>
        </View>
      </View>

      {/* FAB — floats above tab bar */}
      <TouchableOpacity style={styles.fabFloat} onPress={() => onNext(selected)}>
        <Feather name="check" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── Flow 4: Recipe Preview ───────────────────────────────────────────────────
function FlowRecipe({ portions, onBack, onSchedule }: { portions: number; onBack: () => void; onSchedule: () => void }) {
  const scale = portions / 2;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#3F3F46" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Recipe Preview</Text>
        <TouchableOpacity style={styles.backBtn}>
          <Feather name="share-2" size={20} color="#3F3F46" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={styles.heroCard}>
          <View style={styles.heroImgPlaceholder}>
            <Feather name="image" size={40} color="#A1A1AA" />
          </View>
          <View style={styles.heroBody}>
            <Text style={styles.heroTitle}>{RECIPE.title}</Text>
            <View style={styles.heroTagRow}>
              <View style={styles.tag}><Text style={styles.tagText}>{RECIPE.cuisine}</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>{RECIPE.difficulty}</Text></View>
            </View>
            <View style={styles.heroMetaRow}>
              <Feather name="clock" size={13} color="#71717A" />
              <Text style={styles.heroMetaText}>{RECIPE.time}</Text>
              <Text style={styles.heroMetaText}> · {RECIPE.kcal}</Text>
            </View>
          </View>
        </View>

        {/* Shopping list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shopping List</Text>
          {RECIPE.shopping.map((item, i) => (
            <View key={i} style={styles.listRow}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.portionNote}>for {portions} portions</Text>
          {RECIPE.ingredients.map((ing, i) => (
            <View key={i} style={styles.listRow}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{ing}</Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipe</Text>
          {RECIPE.steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.listText}>{step}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fabFloat} onPress={onSchedule}>
        <Feather name="calendar" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── Flow 5: Weekly Calendar ──────────────────────────────────────────────────
function FlowCalendar({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [selected, setSelected] = useState<{ day: number; slot: string } | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="arrow-left" size={20} color="#3F3F46" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Schedule</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.weekLabel}>WEEK 11 · MAR 2026</Text>

        <View style={styles.calendarCard}>
          {WEEK_DAYS.map((d, di) => (
            <View key={d.day}>
              <View style={styles.dayRow}>
                <View style={styles.dayLabelCol}>
                  <Text style={styles.dayName}>{d.day}</Text>
                  <Text style={styles.dayDate}>{d.date}</Text>
                </View>
                <View style={styles.slotsCol}>
                  {MEAL_SLOTS.map((slot) => {
                    const isSelected = selected?.day === di && selected?.slot === slot;
                    return (
                      <TouchableOpacity
                        key={slot}
                        style={[styles.slotBtn, isSelected && styles.slotBtnSelected]}
                        onPress={() => setSelected({ day: di, slot })}
                      >
                        <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              {di < WEEK_DAYS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.fabFloat, !selected && styles.fabDisabled]}
        onPress={selected ? onDone : undefined}
      >
        <Feather name="check" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── Root Chef Screen ─────────────────────────────────────────────────────────
export default function ChefScreen() {
  const [step, setStep] = useState<FlowStep>('input');
  const [portions, setPortions] = useState(3);

  const reset = () => setStep('input');

  switch (step) {
    case 'input':
      return (
        <FlowInput
          onSearch={() => setStep('loading')}
          onSuggestions={() => setStep('suggestions')}
        />
      );
    case 'suggestions':
      return (
        <FlowSuggestions
          onBack={() => setStep('input')}
          onSelect={() => setStep('loading')}
        />
      );
    case 'loading':
      return <FlowLoading onDone={() => setStep('portions')} />;
    case 'portions':
      return (
        <FlowPortions
          onBack={() => setStep('input')}
          onNext={(p) => { setPortions(p); setStep('recipe'); }}
        />
      );
    case 'recipe':
      return (
        <FlowRecipe
          portions={portions}
          onBack={() => setStep('portions')}
          onSchedule={() => setStep('calendar')}
        />
      );
    case 'calendar':
      return (
        <FlowCalendar
          onBack={() => setStep('recipe')}
          onDone={reset}
        />
      );
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 110,
    gap: 20,
  },

  // Status bar
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62,
    paddingHorizontal: 24,
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

  // Flow 1 centered layout
  inputContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  searchSection: {
    gap: 16,
  },

  // Nav header (used by Suggestions / Recipe / Calendar)
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 21,
    paddingBottom: 19,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F3F46',
  },

  // Flow 3 header
  portionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 21,
    paddingBottom: 19,
    minHeight: 87,
  },
  portionHeaderLeft: {
    flex: 1,
    gap: 4,
    paddingRight: 16,
  },
  portionHeaderTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#3F3F46',
    letterSpacing: -0.5,
  },
  portionHeaderSub: {
    fontSize: 14,
    color: '#71717A',
  },
  circleBackBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#3F3F46',
  },

  // Section label
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#71717A',
  },

  // Suggestion chips
  chipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#E4E4E7',
    borderRadius: 20,
  },
  chipLabel: {
    fontSize: 14,
    color: '#3F3F46',
    fontWeight: '500',
  },

  // FAB
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#52525B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.125,
    shadowRadius: 12,
    elevation: 4,
  },
  fabFloat: {
    position: 'absolute',
    bottom: 110,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#52525B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.125,
    shadowRadius: 12,
    elevation: 4,
  },
  fabDisabled: {
    backgroundColor: '#A1A1AA',
  },

  // Recipes grid
  recipesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  recipeCard: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    overflow: 'hidden',
  },
  recipeCardSelected: {
    borderColor: '#52525B',
    borderWidth: 2,
  },
  recipeImgPlaceholder: {
    height: 100,
    backgroundColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeCardBody: {
    padding: 10,
    gap: 4,
  },
  recipeCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3F3F46',
  },
  recipeCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  recipeCardMetaText: {
    fontSize: 11,
    color: '#A1A1AA',
  },

  // CTA bar
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 100,
    paddingTop: 12,
    backgroundColor: '#F7F7F8',
  },
  ctaBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#52525B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnDisabled: {
    backgroundColor: '#A1A1AA',
  },
  ctaBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Loading
  sparkleCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3F3F46',
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 28,
  },
  skeletons: {
    width: '80%',
    gap: 10,
  },
  skeletonBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E4E4E7',
    alignSelf: 'flex-start',
  },

  // Portions
  portionSection: {
    gap: 24,
  },
  portionCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  portionCard: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  portionCardSelected: {
    backgroundColor: '#3F3F46',
    borderColor: '#3F3F46',
  },
  portionCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#A1A1AA',
  },
  portionCountSelected: {
    color: '#FFFFFF',
  },
  portionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A1A1AA',
  },
  portionLabelSelected: {
    color: 'rgba(255,255,255,0.7)',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0F0F2',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#3F3F46',
    lineHeight: 18,
  },

  // Recipe preview
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    overflow: 'hidden',
  },
  heroImgPlaceholder: {
    height: 160,
    backgroundColor: '#E4E4E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBody: {
    padding: 16,
    gap: 8,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#18181B',
  },
  heroTagRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F4F4F5',
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#52525B',
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    fontSize: 13,
    color: '#71717A',
  },

  // Sections
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#18181B',
  },
  portionNote: {
    fontSize: 12,
    color: '#A1A1AA',
    marginTop: -4,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#71717A',
    marginTop: 6,
  },
  listText: {
    flex: 1,
    fontSize: 13,
    color: '#52525B',
    lineHeight: 20,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  stepNum: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#3F3F46',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Calendar
  weekLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#A1A1AA',
    textAlign: 'center',
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    overflow: 'hidden',
  },
  dayRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    gap: 16,
    minHeight: 60,
  },
  dayLabelCol: {
    width: 36,
    alignItems: 'center',
    gap: 2,
    paddingTop: 2,
  },
  dayName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A1A1AA',
    letterSpacing: 0.5,
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3F3F46',
  },
  slotsCol: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  slotBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E4E4E7',
    backgroundColor: '#FFFFFF',
  },
  slotBtnSelected: {
    backgroundColor: '#3F3F46',
    borderColor: '#3F3F46',
  },
  slotText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#71717A',
  },
  slotTextSelected: {
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E4E4E7',
    marginHorizontal: 16,
  },
});
