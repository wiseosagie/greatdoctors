// ─────────────────────────────────────────────────────────────────────────────
// Patient contact info step — injected as second-to-last step in every condition
// ─────────────────────────────────────────────────────────────────────────────
export const PATIENT_INFO_STEP = {
  id: 'patient_info',
  title: 'Your Contact Details',
  icon: '👤',
  questions: [
    {
      id: 'first_name',
      type: 'text',
      label: 'First Name',
      placeholder: 'Jane',
      required: true,
    },
    {
      id: 'last_name',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Smith',
      required: true,
    },
    {
      id: 'phone',
      type: 'tel',
      label: 'Phone Number',
      placeholder: '(817) 000-0000',
      required: true,
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address (optional)',
      placeholder: 'jane@email.com',
      required: false,
    },
    {
      id: 'dob',
      type: 'date',
      label: 'Date of Birth',
      required: true,
    },
    {
      id: 'gender',
      type: 'radio',
      label: 'Biological Sex',
      required: true,
      options: ['Male', 'Female', 'Prefer not to say'],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared question blocks reused across conditions
// ─────────────────────────────────────────────────────────────────────────────
const Q_FEVER = {
  id: 'fever',
  type: 'radio',
  label: 'Do you currently have a fever?',
  required: true,
  blocker: {
    values: ['Yes'],
    message: 'Patients experiencing fever levels over 100°F are advised to see a local doctor immediately. Please visit an urgent care center or emergency room.',
  },
  options: ['Yes', 'No'],
}

const Q_MEDICAL_CONDITIONS = {
  id: 'medical_conditions',
  type: 'radio_with_text',
  label: 'Do you have any medical conditions?',
  required: true,
  options: ['Yes – list below', 'No medical conditions'],
  textLabel: 'List your medical conditions',
  textTriggerValue: 'Yes – list below',
}

const Q_MEDICATIONS = {
  id: 'medications',
  type: 'radio_with_text',
  label: 'Are you taking any medicines, supplements, herbal remedies, or other prescriptions?',
  required: true,
  options: ['Yes – list below', 'No'],
  textLabel: 'List medications you are currently taking',
  textTriggerValue: 'Yes – list below',
}

const Q_DRUG_ALLERGIES = {
  id: 'drug_allergies',
  type: 'radio_with_text',
  label: 'Do you have any drug allergies?',
  required: true,
  options: ['Yes – list below', 'No'],
  textLabel: 'List medications you are allergic to',
  textTriggerValue: 'Yes – list below',
}

const Q_CONTRAINDICATIONS_3 = {
  id: 'contraindications',
  type: 'checkbox_blocker',
  label: 'Do any of the following currently apply to you?',
  required: true,
  blockerValues: ['Breastfeeding or Pregnant', 'Heart, Kidney or Liver problems', 'Fever over 100.4°F / 38°C'],
  safeValue: 'None of the above',
  blockerMessage: 'Based on the responses provided, at this time we are unable to proceed with your treatment. Please return when one of the above conditions changes.',
  options: [
    'Breastfeeding or Pregnant',
    'Heart, Kidney or Liver problems',
    'Fever over 100.4°F / 38°C',
    'None of the above',
  ],
}

const Q_CONTRAINDICATIONS_2 = {
  id: 'contraindications',
  type: 'checkbox_blocker',
  label: 'Do any of the following currently apply to you?',
  required: true,
  blockerValues: ['Heart, Kidney or Liver problems', 'Fever over 100.4°F / 38°C'],
  safeValue: 'None of the above',
  blockerMessage: 'Based on the responses provided, at this time we are unable to proceed with your treatment. Please return when one of the above conditions changes.',
  options: [
    'Heart, Kidney or Liver problems',
    'Fever over 100.4°F / 38°C',
    'None of the above',
  ],
}

const Q_TERMS = {
  id: 'terms',
  type: 'terms',
  label: 'Terms & Conditions',
  required: true,
}

// ─────────────────────────────────────────────────────────────────────────────
// CONDITIONS
// ─────────────────────────────────────────────────────────────────────────────
export const QUESTIONS = {

  // ── 1. Dental Infection ───────────────────────────────────────────────────
  dental: {
    id: 'dental',
    name: 'Dental Infection / Toothache',
    price: '$29.99',
    icon: '🦷',
    color: '#0A9B8C',
    intro: 'Dental infections can be treated quickly with oral antibiotics. If your dentist can\'t see you right away, we can prescribe treatment to relieve pain and start your healing.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_2],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Do you have any of these symptoms? Select all that apply.',
            options: [
              'Fever or headache',
              'Tooth pain – sharp, throbbing, or constant',
              'Ear pain',
              'Pus production',
              'Swelling around the tooth or gum',
              'Bad odor from the mouth',
              'Foul-tasting drainage from the infected tooth',
            ],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 2. STDs ───────────────────────────────────────────────────────────────
  stds: {
    id: 'stds',
    name: 'STD Treatment',
    price: '$39.99',
    icon: '🔬',
    color: '#1E6FBF',
    intro: 'Discreet, private STI treatment. A board-certified physician will review your responses and send a personalized treatment plan to your local pharmacy.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_2],
      },
      {
        id: 'partner',
        title: 'Partner Treatment',
        icon: '👥',
        questions: [
          {
            id: 'partner_treatment',
            type: 'radio',
            label: 'We recommend your partner get treated to avoid reinfection — 50% off partner treatment.',
            required: true,
            options: ['Yes, treat my partner too', 'No thanks'],
          },
          {
            id: 'partner_name',
            type: 'text',
            label: 'Partner\'s Full Name',
            conditional: { dependsOn: 'partner_treatment', value: 'Yes, treat my partner too' },
          },
          {
            id: 'partner_dob',
            type: 'date',
            label: 'Partner\'s Date of Birth',
            conditional: { dependsOn: 'partner_treatment', value: 'Yes, treat my partner too' },
          },
          {
            id: 'partner_gender',
            type: 'radio',
            label: 'Partner\'s Gender',
            options: ['Male', 'Female', 'Other'],
            conditional: { dependsOn: 'partner_treatment', value: 'Yes, treat my partner too' },
          },
          {
            id: 'partner_weight',
            type: 'text',
            label: 'Partner\'s Approximate Weight (lbs)',
            conditional: { dependsOn: 'partner_treatment', value: 'Yes, treat my partner too' },
          },
          {
            id: 'partner_allergies',
            type: 'radio_with_text',
            label: 'Does your partner have drug allergies?',
            options: ['Yes – list below', 'No'],
            textLabel: 'List medications they are allergic to',
            textTriggerValue: 'Yes – list below',
            conditional: { dependsOn: 'partner_treatment', value: 'Yes, treat my partner too' },
          },
        ],
      },
      {
        id: 'lab',
        title: 'Lab Testing',
        icon: '🧪',
        questions: [
          {
            id: 'lab_test',
            type: 'radio',
            label: 'We recommend a lab test after treatment to confirm the infection is fully cleared.',
            required: true,
            options: [
              'Yes – 1 Lab test – $39.99 (Self)',
              'Yes – 2 Lab tests – $69.99 (Self)',
              'Yes – 3 Lab tests – $99.99 (Self)',
              'Yes – 1 Lab test – $79.99 (Self + Partner)',
              'Yes – 2 Lab tests – $139.99 (Self + Partner)',
              'Yes – 3 Lab tests – $189.99 (Self + Partner)',
              'No lab test',
            ],
          },
        ],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'std_type',
            type: 'checkbox',
            label: 'What STDs do you suspect you have? Select all that apply.',
            options: ['Chlamydia', 'Gonorrhea', 'Epididymitis', 'Trichomoniasis', 'Herpes', 'UTI'],
          },
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Do you have any of these symptoms? Select all that apply.',
            options: [
              'White clumpy discharge',
              'Burning or frequent urination',
              'Vaginal or Penile irritation / itching',
              'Vaginal or Penile bleeding between periods',
              'Thin white, gray, or green discharge',
              'Lower abdomen or pelvic pain',
              'Fishy smell that gets stronger after sex',
              'Back / flank pain',
            ],
          },
          {
            id: 'unprotected_sex',
            type: 'checkbox',
            label: 'Have you had unprotected sex with someone with:',
            options: ['Herpes', 'Syphilis', 'HIV', 'Other STDs (Gonorrhea, Chlamydia)'],
          },
          {
            id: 'prior_std',
            type: 'radio',
            label: 'Have you had an STD infection before?',
            required: true,
            options: ['Yes, diagnosed by a doctor', 'Yes, self-diagnosed', 'No'],
          },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: [
              'Azithromycin (Z-Pak) & Suprax',
              'Azithromycin (Z-Pak) & Doxycycline',
              'Metronidazole & Doxycycline (if you suspect Trichomonas)',
              'Tinidazole & Doxycycline (if you suspect Trichomonas)',
              'Let our medical providers decide',
            ],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 3. Sinus / Allergies ─────────────────────────────────────────────────
  sinus: {
    id: 'sinus',
    name: 'Sinus Infection / Allergies',
    price: '$29.99',
    icon: '🤧',
    color: '#0A9B8C',
    intro: 'Bacterial rhinosinusitis often responds well to antibiotic treatment. Tell us about your symptoms and we\'ll get you the right prescription.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'history',
        title: 'Condition History',
        icon: '📋',
        questions: [
          { id: 'prior_sinus', type: 'radio', label: 'Have you had a sinus infection before?', required: true, options: ['Yes, diagnosed by a doctor', 'Yes, self-diagnosed', 'No'] },
          { id: 'symptom_start', type: 'radio', label: 'When did your symptoms start?', required: true, options: ['Less than 10 days ago', 'More than 10 days ago'] },
          { id: 'viral_illness', type: 'radio', label: 'Did you recently recover from a viral illness such as the flu?', required: true, options: ['Yes', 'No'] },
          { id: 'allergies_history', type: 'radio', label: 'Do you have a history of seasonal, environmental, or other allergies?', required: true, options: ['Yes', 'No'] },
        ],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'nasal_symptoms',
            type: 'checkbox',
            label: 'Do you have any of these symptoms? Select all that apply.',
            options: ['Nasal congestion / stuffiness', 'Sneezing', 'Watery nose', 'Itchy nose', 'Headache', 'Facial congestion', 'Facial pain or pressure'],
          },
          {
            id: 'discharge_symptoms',
            type: 'checkbox',
            label: 'Do you have a runny nose or cough? Select all that apply.',
            options: ['Watery discharge', 'Yellow-green drainage from nose', 'Nasal bleeding', 'Dry cough', 'Coughing up mucus / phlegm'],
          },
          {
            id: 'eye_symptoms',
            type: 'checkbox',
            label: 'Do you have any eye symptoms?',
            options: ['Red eyes', 'Itchy eyes', 'Watery eyes', 'None'],
          },
          {
            id: 'allergen_exposure',
            type: 'radio',
            label: 'Are you often exposed to allergens or irritants at home or work?',
            required: true,
            options: ['Yes, allergens bother me', 'Yes, but none bother me', 'No'],
          },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: ['Amoxicillin-clavulanate (Augmentin)', 'Azithromycin', 'Doxycycline', 'Levofloxacin', 'Let our medical providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 4. Depression & Anxiety ───────────────────────────────────────────────
  anxiety: {
    id: 'anxiety',
    name: 'Depression & Anxiety',
    price: '$49.99',
    icon: '🧠',
    color: '#163452',
    intro: 'You deserve support. A board-certified physician will review your responses and create a personalized treatment plan — confidentially and without judgment.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'history',
        title: 'Mental Health History',
        icon: '📋',
        questions: [
          {
            id: 'prior_treatment',
            type: 'radio_with_text',
            label: 'Have you ever been treated for panic disorders, depression, or anxiety?',
            required: true,
            options: ['Yes – describe below', 'No'],
            textLabel: 'Describe your past treatment',
            textTriggerValue: 'Yes – describe below',
          },
        ],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'What symptoms have you been experiencing recently? Select all that apply.',
            options: [
              'Prolonged sadness or lack of motivation',
              'Hopelessness',
              'Loss of interest in activities',
              'Agitation, restlessness, or irritability',
              'Self-imposed social isolation',
              'Excessive crying',
              'Changes in sleep (more or less than usual)',
              'Changes in diet (eating more or less than usual)',
              'Chronic fatigue or exhaustion',
              'Difficulty concentrating',
              'Difficulty remembering details',
              'Thoughts of suicide',
              'Planning for suicide',
              'Weight loss or gain',
            ],
          },
          {
            id: 'duration',
            type: 'radio',
            label: 'How long have you been having these symptoms?',
            required: true,
            options: ['Started today', '1–3 days', 'Over 1 week', 'Not experiencing any symptoms'],
          },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: ['Antidepressants', 'Antipsychotic medications', 'Anxiolytic medications', 'Selective Serotonin Reuptake Inhibitor (SSRI)', 'Let our medical providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 5. Ear Infection ──────────────────────────────────────────────────────
  ear: {
    id: 'ear',
    name: 'Ear Infection',
    price: '$29.99',
    icon: '👂',
    color: '#0A9B8C',
    intro: 'Ear infections are common and very treatable. Tell us about your symptoms and we\'ll send a prescription to your pharmacy today.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Do you have any of these symptoms? Select all that apply.',
            options: ['Sleeplessness', 'Ear pain, headache, or neck pain', 'Ear feels clogged or full', 'Fluid draining from ear', 'Ringing in the ear', 'Pain when pulling on ear', 'Nausea or vomiting', 'Diarrhea, fever, or chills', 'Hearing loss'],
          },
          { id: 'duration', type: 'radio', label: 'How long have you been having these symptoms?', required: true, options: ['1–3 days', '4–7 days', 'Over 1 week'] },
          { id: 'water_exposure', type: 'checkbox', label: 'Do you suspect water got inside your ear canal during:', options: ['Swimming', 'Bathing', 'Other activity', 'No water exposure'] },
          { id: 'prior_ear', type: 'radio', label: 'Have you ever been diagnosed with an ear infection?', required: true, options: ['Yes', 'No'] },
          { id: 'ear_affected', type: 'radio', label: 'Which ear is affected?', required: true, options: ['Right', 'Left', 'Both'] },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: ['Amoxicillin', 'Ciprofloxacin', 'Neomycin', 'Ofloxacin', 'Let our medical providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 6. UTI ────────────────────────────────────────────────────────────────
  uti: {
    id: 'uti',
    name: 'UTI Treatment',
    price: '$29.99',
    icon: '💧',
    color: '#0A9B8C',
    intro: 'Urinary tract infections are very common and highly treatable. Answer a few questions and we\'ll send the right prescription to your pharmacy today.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Do you have any of these symptoms? Select all that apply.',
            options: ['Burning sensation when urinating', 'Frequent urge to urinate', 'Cloudy or strong-smelling urine', 'Pelvic pain or pressure', 'Blood in urine', 'Lower back / flank pain'],
          },
          { id: 'prior_uti', type: 'radio', label: 'Have you had a UTI before?', required: true, options: ['Yes, diagnosed by a doctor', 'Yes, self-diagnosed', 'No'] },
          { id: 'duration', type: 'radio', label: 'How long have you had these symptoms?', required: true, options: ['Less than 24 hours', '1–3 days', 'Over 3 days'] },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: ['Trimethoprim / Sulfamethoxazole (Bactrim)', 'Nitrofurantoin (Macrobid)', 'Ciprofloxacin', 'Fosfomycin', 'Let our medical providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 7. Weight Loss — GLP-1 ────────────────────────────────────────────────
  weightloss: {
    id: 'weightloss',
    name: 'GLP-1 Weight Loss',
    price: 'From $149.99/mo',
    icon: '⚖️',
    color: '#0A9B8C',
    intro: 'GLP-1 medications like semaglutide help suppress appetite, slow digestion, and support sustainable weight loss. Complete this screening to get started.',
    steps: [
      {
        id: 'redflags',
        title: 'Safety Screening',
        icon: '🛡️',
        questions: [
          {
            id: 'thyroid_cancer',
            type: 'checkbox_blocker',
            label: 'Have you or any family member ever been diagnosed with Medullary Thyroid Cancer (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2)?',
            required: true,
            blockerValues: ['Yes'],
            safeValue: 'No',
            blockerMessage: 'GLP-1 medications are contraindicated with a personal or family history of MTC or MEN 2. We are unable to proceed. Please consult an endocrinologist in person.',
            options: ['Yes', 'No'],
          },
          {
            id: 'pancreatitis',
            type: 'checkbox_blocker',
            label: 'Have you ever had pancreatitis (severe inflammation of the pancreas)?',
            required: true,
            blockerValues: ['Yes'],
            safeValue: 'No',
            blockerMessage: 'A history of pancreatitis is a contraindication for GLP-1 therapy. Please seek in-person evaluation.',
            options: ['Yes', 'No'],
          },
          {
            id: 'pregnancy',
            type: 'checkbox_blocker',
            label: 'Are you currently pregnant, breastfeeding, or planning to become pregnant in the next 3 months?',
            required: true,
            blockerValues: ['Yes'],
            safeValue: 'No',
            blockerMessage: 'GLP-1 medications are not safe during pregnancy or breastfeeding. Please consult your OB-GYN.',
            options: ['Yes', 'No'],
          },
          {
            id: 'organ_disease',
            type: 'checkbox_blocker',
            label: 'Do you have a history of severe kidney disease or gallbladder disease?',
            required: true,
            blockerValues: ['Yes'],
            safeValue: 'No',
            blockerMessage: 'Severe kidney or gallbladder disease requires in-person evaluation before starting GLP-1 therapy.',
            options: ['Yes', 'No'],
          },
        ],
      },
      {
        id: 'gut_health',
        title: 'Digestive Health',
        icon: '🫁',
        questions: [
          {
            id: 'nausea_freq',
            type: 'radio',
            label: 'How often do you experience nausea or vomiting?',
            required: true,
            options: ['Never', 'Occasionally', 'Frequently'],
          },
          {
            id: 'constipation_freq',
            type: 'radio',
            label: 'How often do you experience severe constipation?',
            required: true,
            options: ['Never', 'Occasionally', 'Frequently'],
          },
          {
            id: 'reflux_freq',
            type: 'radio',
            label: 'How often do you experience acid reflux or heartburn?',
            required: true,
            options: ['Never', 'Occasionally', 'Frequently'],
          },
          {
            id: 'gastroparesis',
            type: 'radio',
            label: 'Have you ever been diagnosed with gastroparesis (delayed stomach emptying)?',
            required: true,
            options: ['Yes', 'No'],
          },
          {
            id: 'prior_surgery',
            type: 'radio_with_text',
            label: 'Have you had any major surgeries on your stomach or intestines (e.g., gastric bypass, bowel resection)?',
            required: true,
            options: ['Yes – describe below', 'No'],
            textLabel: 'Please describe your surgery',
            textTriggerValue: 'Yes – describe below',
          },
        ],
      },
      {
        id: 'metabolic',
        title: 'Metabolic History',
        icon: '🔬',
        questions: [
          {
            id: 'diabetes',
            type: 'radio',
            label: 'Have you been diagnosed with diabetes?',
            required: true,
            options: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Neither'],
          },
          {
            id: 'diabetes_meds',
            type: 'checkbox',
            label: 'Are you currently taking any of the following? Select all that apply.',
            options: ['Insulin', 'Sulfonylureas (e.g., Glipizide, Glyburide)', 'Other GLP-1 medications (e.g., Wegovy, Ozempic, Mounjaro)', 'None of the above'],
          },
          {
            id: 'hypoglycemia',
            type: 'radio',
            label: 'Have you experienced frequent episodes of low blood sugar (hypoglycemia)?',
            required: true,
            options: ['Yes', 'No'],
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & Readiness',
        icon: '🏃',
        questions: [
          {
            id: 'injection_comfort',
            type: 'radio',
            label: 'GLP-1 medications are self-administered via a small needle in the abdomen or thigh. Are you comfortable performing a self-injection?',
            required: true,
            options: ['Yes, I am comfortable', 'No, I need guidance', 'I\'m not sure'],
          },
          {
            id: 'eating_disorder',
            type: 'radio',
            label: 'Do you have a history of eating disorders (Anorexia, Bulimia) or untreated depression/suicidal ideation?',
            required: true,
            options: ['Yes', 'No'],
          },
          {
            id: 'current_weight',
            type: 'text',
            label: 'Current weight (lbs)',
            required: true,
          },
          {
            id: 'current_height',
            type: 'text',
            label: 'Current height (e.g., 5\'8")',
            required: true,
          },
          {
            id: 'blood_pressure',
            type: 'text',
            label: 'Most recent blood pressure reading (e.g., 120/80)',
            required: false,
          },
          {
            id: 'recent_labs',
            type: 'radio',
            label: 'Do you have recent blood work (A1C, Lipid Panel, Creatinine) from the past 6 months?',
            required: true,
            options: ['Yes', 'No – I will obtain labs'],
          },
          {
            id: 'weight_goal',
            type: 'text',
            label: 'How much weight are you looking to lose? (e.g., 30 lbs)',
            required: true,
          },
        ],
      },
      {
        id: 'prescription',
        title: 'Select Your Plan',
        icon: '💊',
        questions: [
          {
            id: 'glp_type',
            type: 'radio',
            label: 'Which medication program are you interested in?',
            required: true,
            options: ['GLP-1 (Semaglutide) — From $149.99/mo', 'GLP-2 (Tirzepatide) — From $249.99/mo', 'Let our providers recommend'],
          },
          {
            id: 'glp1_month',
            type: 'radio',
            label: 'GLP-1 — Select your starting month:',
            required: false,
            conditional: { dependsOn: 'glp_type', value: 'GLP-1 (Semaglutide) — From $149.99/mo' },
            options: ['Month 1 — $149.99', 'Month 2 — $199.99', 'Month 3 — $249.99', 'Month 4 — $299.99', 'Month 5 — $349.99', 'Month 6 — $399.99'],
          },
          {
            id: 'glp2_month',
            type: 'radio',
            label: 'GLP-2 — Select your starting month:',
            required: false,
            conditional: { dependsOn: 'glp_type', value: 'GLP-2 (Tirzepatide) — From $249.99/mo' },
            options: ['Month 1 — $249.99', 'Month 2 — $299.99', 'Month 3 — $349.99', 'Month 4 — $399.99', 'Month 5 — $449.99', 'Month 6 — $499.99'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 9. Insomnia ───────────────────────────────────────────────────────────
  insomnia: {
    id: 'insomnia',
    name: 'Insomnia',
    price: '$49.99',
    icon: '😴',
    color: '#163452',
    intro: 'Getting quality sleep is essential to your health. Tell us about your symptoms and we\'ll create a personalized treatment plan.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Which symptoms have you been experiencing? Select all that apply.',
            options: [
              'Difficulty initiating sleep',
              'Frequent awakenings during the night',
              'Non-restorative or unrefreshing sleep',
              'Daytime fatigue or sleepiness',
              'Irritability or mood changes',
              'Difficulty concentrating or memory issues',
            ],
          },
          { id: 'duration', type: 'radio', label: 'How long have you been experiencing these symptoms?', required: true, options: ['Started today', '1–3 days', '4–7 days', 'More than 1 week'] },
          { id: 'prior_treatment', type: 'radio', label: 'Have you ever been treated for insomnia before?', required: true, options: ['Yes', 'No'] },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: ['Amitriptyline', 'Diphenhydramine', 'Doxylamine', 'Mirtazapine', 'Temazepam', 'Trazodone', 'Let our medical providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 10. Hypertension ──────────────────────────────────────────────────────
  hypertension: {
    id: 'hypertension',
    name: 'High Blood Pressure',
    price: '$49.99',
    icon: '❤️',
    color: '#c0392b',
    intro: 'Hypertension can be effectively managed with the right medication. Our physicians will review your readings and create a personalized treatment plan.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'readings',
        title: 'Blood Pressure Readings',
        icon: '📊',
        questions: [
          { id: 'cholesterol_tested', type: 'radio', label: 'Have you had a cholesterol (lipid panel) test in the past 2 years?', required: true, options: ['Yes', 'Not yet'] },
          { id: 'bp_reading_1', type: 'text', label: 'Blood Pressure Reading 1 (e.g., 130/85)', required: true },
          { id: 'bp_reading_2', type: 'text', label: 'Blood Pressure Reading 2 (e.g., 128/82)', required: true },
          { id: 'bp_reading_3', type: 'text', label: 'Blood Pressure Reading 3 (e.g., 135/88)', required: true },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'drug_choice',
            type: 'radio',
            label: 'Select your treatment preference (our providers will make the final decision):',
            required: true,
            options: ['ACE inhibitor', 'Beta blocker', 'Calcium channel blocker', 'Diuretic', 'Vasodilator', 'Let our medical providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 11. Birth Control ─────────────────────────────────────────────────────
  birthcontrol: {
    id: 'birthcontrol',
    name: 'Birth Control',
    price: '$49.99',
    icon: '🩺',
    color: '#1E6FBF',
    intro: 'Get a birth control prescription from the comfort of home. No insurance needed, no waiting rooms. Our providers will review your eligibility and prescribe when appropriate.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'history',
        title: 'Contraceptive History',
        icon: '📋',
        questions: [
          { id: 'prior_bc', type: 'radio', label: 'Have you used prescription birth control before?', required: true, options: ['Yes', 'No'] },
          { id: 'bc_type', type: 'radio', label: 'Which type of birth control are you interested in?', required: true, options: ['Combination pill (estrogen + progestin)', 'Progestin-only pill (mini-pill)', 'Let our providers decide'] },
          { id: 'smoking', type: 'radio', label: 'Do you currently smoke?', required: true, options: ['Yes', 'No'] },
          { id: 'migraines', type: 'radio', label: 'Do you experience migraines with aura?', required: true, options: ['Yes', 'No'] },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 12. Acne Treatment ────────────────────────────────────────────────────
  acne: {
    id: 'acne',
    name: 'Acne Treatment',
    price: '$49.99',
    icon: '🧴',
    color: '#E67E22',
    intro: 'Personalized acne treatment plans based on your skin type and severity. Our providers will prescribe topical or oral therapy when appropriate.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'About Your Acne',
        icon: '🔍',
        questions: [
          {
            id: 'acne_type',
            type: 'checkbox',
            label: 'Which types of acne do you have? Select all that apply.',
            options: [
              'Whiteheads or blackheads',
              'Small red pimples (papules)',
              'Pus-filled pimples (pustules)',
              'Larger painful nodules',
              'Deep cystic acne',
            ],
          },
          { id: 'location', type: 'radio', label: 'Where is your acne primarily located?', required: true, options: ['Face', 'Back', 'Chest', 'Multiple areas'] },
          { id: 'severity', type: 'radio', label: 'How would you rate the severity of your acne?', required: true, options: ['Mild (few blemishes)', 'Moderate (many blemishes)', 'Severe (widespread or cystic)'] },
          { id: 'duration', type: 'radio', label: 'How long have you had acne?', required: true, options: ['Less than 3 months', '3–12 months', 'More than 1 year'] },
          { id: 'prior_treatment', type: 'radio', label: 'Have you tried prescription acne treatments before?', required: true, options: ['Yes', 'No'] },
        ],
      },
      {
        id: 'treatment',
        title: 'Treatment Preference',
        icon: '💊',
        questions: [
          {
            id: 'treatment_type',
            type: 'radio',
            label: 'What type of treatment are you open to?',
            required: true,
            options: ['Topical only (cream/gel)', 'Oral medication', 'Both topical and oral', 'Let our providers decide'],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 13. Eczema & Rashes ───────────────────────────────────────────────────
  eczema: {
    id: 'eczema',
    name: 'Eczema & Rashes',
    price: '$49.99',
    icon: '🩹',
    color: '#8E44AD',
    intro: 'Evaluation and treatment for eczema, contact dermatitis, and common inflammatory skin conditions. Our providers will review your symptoms and prescribe appropriate therapy.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'About Your Skin Condition',
        icon: '🔍',
        questions: [
          {
            id: 'rash_type',
            type: 'checkbox',
            label: 'Which symptoms are you experiencing? Select all that apply.',
            options: [
              'Red or inflamed skin',
              'Intense itching',
              'Dry, scaly, or flaking skin',
              'Blistering or oozing',
              'Thickened or leathery skin',
              'Swelling or warmth',
            ],
          },
          { id: 'location', type: 'radio', label: 'Where is the rash or irritation located?', required: true, options: ['Face or neck', 'Arms or hands', 'Legs or feet', 'Torso', 'Multiple areas'] },
          { id: 'duration', type: 'radio', label: 'How long have you had this condition?', required: true, options: ['Less than 1 week', '1–4 weeks', 'More than 1 month', 'Chronic or recurring'] },
          { id: 'trigger', type: 'radio', label: 'Do you suspect a trigger?', required: true, options: ['Soap or detergent', 'Food or allergy', 'Stress', 'Unknown', 'Other'] },
          { id: 'prior_treatment', type: 'radio', label: 'Have you used any prescription treatments for this before?', required: true, options: ['Yes', 'No'] },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 14. Fungal Infections ─────────────────────────────────────────────────
  fungal: {
    id: 'fungal',
    name: 'Fungal Infections',
    price: '$49.99',
    icon: '🔬',
    color: '#27AE60',
    intro: 'Treatment for common fungal skin infections including ringworm, athlete\'s foot, jock itch, and nail fungus. Get a prescription without leaving home.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'About Your Infection',
        icon: '🔍',
        questions: [
          { id: 'type', type: 'radio', label: 'Which type of fungal infection do you have?', required: true, options: ['Ringworm (circular rash on skin)', 'Athlete\'s foot (feet)', 'Jock itch (groin area)', 'Nail fungus (discolored, thickened nail)', 'Not sure'] },
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Which symptoms are you experiencing? Select all that apply.',
            options: [
              'Circular or ring-shaped rash',
              'Redness or scaling',
              'Itching or burning',
              'Cracking or peeling skin',
              'Thickened or discolored nails',
              'Odor',
            ],
          },
          { id: 'duration', type: 'radio', label: 'How long have you had this infection?', required: true, options: ['Less than 1 week', '1–4 weeks', 'More than 1 month'] },
          { id: 'prior_treatment', type: 'radio', label: 'Have you tried over-the-counter antifungal treatments?', required: true, options: ['Yes – not effective', 'Yes – partially effective', 'No'] },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 15. Back Pain ─────────────────────────────────────────────────────────
  backpain: {
    id: 'backpain',
    name: 'Back Pain',
    price: '$49.99',
    icon: '🦴',
    color: '#2980B9',
    intro: 'Evaluation and treatment for acute, uncomplicated back pain. Our providers will assess your symptoms and recommend a treatment plan.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [
          {
            id: 'contraindications',
            type: 'checkbox_blocker',
            label: 'Do any of the following currently apply to you?',
            required: true,
            blockerValues: ['Breastfeeding or Pregnant', 'Heart, Kidney or Liver problems', 'Fever over 100.4°F / 38°C', 'Numbness or weakness in legs', 'Loss of bladder or bowel control'],
            safeValue: 'None of the above',
            blockerMessage: 'Based on your responses, we are unable to proceed with telehealth treatment at this time. Please seek in-person medical evaluation immediately.',
            options: [
              'Breastfeeding or Pregnant',
              'Heart, Kidney or Liver problems',
              'Fever over 100.4°F / 38°C',
              'Numbness or weakness in legs',
              'Loss of bladder or bowel control',
              'None of the above',
            ],
          },
        ],
      },
      {
        id: 'symptoms',
        title: 'About Your Back Pain',
        icon: '🔍',
        questions: [
          { id: 'location', type: 'radio', label: 'Where is your pain located?', required: true, options: ['Lower back', 'Mid back', 'Upper back', 'Pain radiates down leg (sciatica)'] },
          { id: 'onset', type: 'radio', label: 'How did the pain begin?', required: true, options: ['Sudden injury or lifting', 'Gradual onset', 'Woke up with pain', 'No clear cause'] },
          { id: 'duration', type: 'radio', label: 'How long have you had this pain?', required: true, options: ['Less than 3 days', '3–7 days', '1–4 weeks', 'More than 1 month'] },
          { id: 'severity', type: 'radio', label: 'How would you rate your pain (1 = mild, 10 = severe)?', required: true, options: ['1–3 (mild)', '4–6 (moderate)', '7–10 (severe)'] },
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Do you have any of the following? Select all that apply.',
            options: [
              'Pain that worsens with sitting or bending',
              'Pain that improves with movement',
              'Muscle spasms',
              'Stiffness in the morning',
              'Shooting or burning pain down the leg',
              'None of the above',
            ],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 16. Acid Reflux / GERD ────────────────────────────────────────────────
  gerd: {
    id: 'gerd',
    name: 'Acid Reflux / GERD',
    price: '$49.99',
    icon: '🔥',
    color: '#E74C3C',
    intro: 'Assessment and medication management for heartburn and acid reflux. Our providers will review your symptoms and prescribe appropriate treatment.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [
          {
            id: 'contraindications',
            type: 'checkbox_blocker',
            label: 'Do any of the following currently apply to you?',
            required: true,
            blockerValues: ['Breastfeeding or Pregnant', 'Heart, Kidney or Liver problems', 'Difficulty swallowing or food getting stuck', 'Unexplained weight loss', 'Vomiting blood or black stools'],
            safeValue: 'None of the above',
            blockerMessage: 'Based on your responses, we are unable to proceed with telehealth treatment at this time. These symptoms require immediate in-person evaluation.',
            options: [
              'Breastfeeding or Pregnant',
              'Heart, Kidney or Liver problems',
              'Difficulty swallowing or food getting stuck',
              'Unexplained weight loss',
              'Vomiting blood or black stools',
              'None of the above',
            ],
          },
        ],
      },
      {
        id: 'symptoms',
        title: 'Your Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Which symptoms are you experiencing? Select all that apply.',
            options: [
              'Heartburn or burning in chest',
              'Acid or sour taste in mouth',
              'Regurgitation of food',
              'Chest pain or discomfort',
              'Chronic cough or throat clearing',
              'Bloating or belching',
              'Nausea',
            ],
          },
          { id: 'frequency', type: 'radio', label: 'How often do you experience symptoms?', required: true, options: ['A few times a week', 'Daily', 'Several times a day'] },
          { id: 'duration', type: 'radio', label: 'How long have you had these symptoms?', required: true, options: ['Less than 2 weeks', '2–8 weeks', 'More than 2 months'] },
          { id: 'triggers', type: 'radio', label: 'Do symptoms worsen after eating, lying down, or at night?', required: true, options: ['After eating', 'When lying down or at night', 'Both', 'No clear pattern'] },
          { id: 'prior_treatment', type: 'radio', label: 'Have you tried antacids or over-the-counter reflux medications?', required: true, options: ['Yes – helped', 'Yes – didn\'t help much', 'No'] },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 17. Thyroid Management ────────────────────────────────────────────────
  thyroid: {
    id: 'thyroid',
    name: 'Thyroid Management',
    price: '$49.99',
    icon: '🧬',
    color: '#16A085',
    intro: 'Medication management and lab review for stable thyroid conditions. Our providers will review your lab results and adjust your treatment as needed.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'history',
        title: 'Thyroid History',
        icon: '📋',
        questions: [
          { id: 'diagnosis', type: 'radio', label: 'What is your thyroid diagnosis?', required: true, options: ['Hypothyroidism (underactive)', 'Hyperthyroidism (overactive)', 'Hashimoto\'s disease', 'Not formally diagnosed', 'Other'] },
          { id: 'current_medication', type: 'radio', label: 'Are you currently on thyroid medication?', required: true, options: ['Yes – seeking refill', 'Yes – need dosage review', 'No'] },
          { id: 'recent_labs', type: 'radio', label: 'Do you have recent thyroid lab results (TSH, T3, T4)?', required: true, options: ['Yes – within last 6 months', 'Yes – older than 6 months', 'No recent labs'] },
          { id: 'lab_values', type: 'text', label: 'If available, please enter your most recent TSH value (e.g., 3.5 mIU/L)', required: false },
        ],
      },
      {
        id: 'symptoms',
        title: 'Current Symptoms',
        icon: '🔍',
        questions: [
          {
            id: 'symptoms',
            type: 'checkbox',
            label: 'Are you currently experiencing any of the following? Select all that apply.',
            options: [
              'Fatigue or low energy',
              'Unexplained weight changes',
              'Feeling cold all the time',
              'Rapid or irregular heartbeat',
              'Hair thinning or loss',
              'Difficulty concentrating',
              'Constipation',
              'Anxiety or irritability',
              'No current symptoms',
            ],
          },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── 18. Men's Health (Hair Loss) ──────────────────────────────────────────
  hairloss: {
    id: 'hairloss',
    name: 'Hair Loss Treatment',
    price: '$39.99',
    icon: '💈',
    color: '#163452',
    intro: 'Effective prescription treatments for hair loss are available. Answer a few questions and our physicians will prescribe the right plan for you.',
    steps: [
      {
        id: 'health',
        title: 'Your Health Background',
        icon: '🏥',
        questions: [Q_FEVER, Q_MEDICAL_CONDITIONS, Q_MEDICATIONS, Q_DRUG_ALLERGIES],
      },
      {
        id: 'safety',
        title: 'Safety Check',
        icon: '🛡️',
        questions: [Q_CONTRAINDICATIONS_3],
      },
      {
        id: 'symptoms',
        title: 'About Your Hair Loss',
        icon: '🔍',
        questions: [
          { id: 'duration', type: 'radio', label: 'How long have you been experiencing hair loss?', required: true, options: ['Less than 6 months', '6–12 months', 'Over 1 year'] },
          { id: 'pattern', type: 'radio', label: 'How would you describe the pattern?', required: true, options: ['Receding hairline', 'Thinning on top', 'Overall thinning', 'Patchy loss'] },
          { id: 'prior_treatment', type: 'radio', label: 'Have you tried any hair loss treatments before?', required: true, options: ['Yes', 'No'] },
        ],
      },
      PATIENT_INFO_STEP,
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },

  // ── Booking ───────────────────────────────────────────────────────────────
  booking: {
    id: 'booking',
    name: 'General Booking',
    icon: '📅',
    price: '$1.00',
    color: '#6366f1',
    intro: 'Quick $1 booking to connect you with one of our doctors.',
    steps: [
      {
        id: 'info',
        title: 'Your Name',
        icon: '👤',
        questions: [
          { id: 'name', type: 'text', label: 'Full Name', placeholder: 'Jane Smith', required: true },
        ],
      },
      { id: 'terms', title: 'Almost Done', icon: '✅', questions: [Q_TERMS] },
    ],
  },
}

// Map service IDs from Services.jsx to question keys
export const SERVICE_TO_QUESTION_MAP = {
  'Chlamydia Treatment': 'stds',
  'Gonorrhea Treatment': 'stds',
  'Syphilis Treatment': 'stds',
  'Genital Herpes Treatment': 'stds',
  'Bacterial Vaginosis (BV)': 'stds',
  'Trichomonas Treatment': 'stds',
  'Pelvic Inflammatory Disease': 'stds',
  'Epididymitis Treatment': 'stds',
  'Genital Warts Treatment': 'stds',
  'Common STD Combo Plan': 'stds',
  'UTI Treatment': 'uti',
  'Dental Infections': 'dental',
  'Ear Infections': 'ear',
  'Dental Infection / Toothache': 'dental',
  'Upper Respiratory Infections': 'sinus',
  'Strep Throat': 'sinus',
  'Asthma (stable patients)': 'sinus',
  'Prescription Refills': 'uti',
  'Hair Loss Treatment': 'hairloss',
  'Weight Loss Medications': 'weightloss',
  "General Men's Health": 'uti',
  'General Anxiety Treatment': 'anxiety',
  'Affordable STD Panel': 'stds',
  'General Health Panel': 'uti',
  'Custom Lab Orders': 'uti',
  'Insomnia': 'insomnia',
  'Sleep Issues': 'insomnia',
  'Hypertension': 'hypertension',
  'High Blood Pressure': 'hypertension',
  'Birth Control': 'birthcontrol',
  'Contraception': 'birthcontrol',
  'Acne Treatment': 'acne',
  'Acne': 'acne',
  'Eczema & Rashes': 'eczema',
  'Eczema': 'eczema',
  'Contact Dermatitis': 'eczema',
  'Fungal Infections': 'fungal',
  'Ringworm': 'fungal',
  "Athlete's Foot": 'fungal',
  'Back Pain': 'backpain',
  'Acid Reflux': 'gerd',
  'Acid Reflux / GERD': 'gerd',
  'GERD': 'gerd',
  'Heartburn': 'gerd',
  'Thyroid Management': 'thyroid',
  'Thyroid Disorders': 'thyroid',
  'General Booking': 'booking',
}
