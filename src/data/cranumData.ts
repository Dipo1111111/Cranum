import { CranumHabit, BiologicalStack } from '../types/habit';

export const CRANUM_HABITS: CranumHabit[] = [
    // CATEGORY A: ACTIVE HABITS (Daily/Weekly Checkable)
    {
        id: 'A001',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks', 'jawline'],
        mechanism: 'Tongue Posture, Maxilla Development',
        name: 'Suction Mewing Practice',
        knowledge: 'Tongue pressure guides maxilla upward/forward, supporting orbital bone. Only 1.7g force needed to move teeth. Tongue can generate 500-600g force. This is the foundation of all facial development.',
        instruction: 'Say "T", smile wide, swallow until tongue suction holds. Hold for 10 seconds. Repeat 3x.',
        dos: ['Say "T" to place tongue tip behind teeth', 'Smile wide, open eyes wide', 'Swallow to create vacuum', 'Keep swallowing until suction holds'],
        donts: ['Don\'t actively push tongue', 'Don\'t let tongue drop', 'Don\'t mew part-time only'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Foundation for all bone development.',
        blueprint: {
            howTo: [
                'Say the letter "T" to find your tongue’s natural resting spot (the T‑spot just behind your front teeth).',
                'Smile as wide as possible and open your eyes wide – this engages the muscles that help create suction.',
                'Swallow firmly. As you swallow, your entire tongue should press against the palate.',
                'Keep swallowing repeatedly until all saliva is gone from your mouth. You’ll feel a vacuum – that’s proper suction mewing.',
                'Once suction is achieved, relax your tongue but maintain the seal. It should feel natural, not forced.'
            ],
            whyItMatters: 'Your tongue is the main driver of facial growth. When it’s suctioned 24/7, it exerts gentle, constant pressure that guides the maxilla upward and forward. Only 1.7g of force is needed to move teeth, and your tongue can generate 500‑600g – so consistency is everything.',
            commonMistakes: 'Common mistakes: Pushing the tongue instead of suctioning, letting the tongue drop during the day, and mewing only part‑time. Tongue pressure guides maxilla upward/forward, supporting orbital bone. Only 1.7g force needed to move teeth. Tongue can generate 500-600g force. This is the foundation of all facial development. 1. Say "T" to place tongue tip behind teeth 2. Smile wide, open eyes wide, swallow to create vacuum 3. Keep swallowing until saliva is gone and suction holds'
        },
        priority: 5,
        phase: 1,
    },
    {
        id: 'A002',
        category: 'active',
        goals: ['forward_upward', 'hollow_cheeks', 'grow_taller', 'jawline'],
        mechanism: 'Cervical Support, Posture',
        name: 'Chin Tucks Against Wall',
        knowledge: 'Neck supports cranium; without a straight neck, the head cannot develop upward/forward. Strengthens SCM muscles and corrects forward head posture.',
        instruction: 'Stand against wall, feet 6" forward, entire back on wall. Roll shoulders back. Tuck chin to neck (make double chin), hold 5 seconds. Repeat 30 times.',
        dos: ['Feet 6" from wall', 'Shoulders back', 'Tuck chin to neck (double chin)'],
        donts: ['Don\'t rush reps', 'Keep shoulders back'],
        frequency: 'daily',
        durationMinutes: 3,
        timeOfDay: 'morning',
        tips: 'Do wall angels between sets.',
        blueprint: {
            howTo: [
                'Stand with your back against a wall, feet about 6 inches forward. Your head, shoulders, and glutes should all touch the wall.',
                'Roll your shoulders back and down to open your chest.',
                'Tuck your chin straight back toward your neck – you should feel a gentle stretch at the base of your skull and the back of your neck. This is a “double chin” position.',
                'Hold for 5 seconds, then release. Repeat 30 times (5 sets of 6).'
            ],
            whyItMatters: 'Your neck supports your cranium. If your neck is not straight, your head can’t develop upward and forward. Chin tucks strengthen the deep neck flexors and correct forward head posture, which is essential for maxillary advancement and overall facial growth.',
            commonMistakes: 'Pro tips: Do them throughout the day, especially after looking at screens. Combine with wall angels for even better results. Neck supports cranium; without a straight neck, the head cannot develop upward/forward. Strengthens SCM muscles and corrects forward head posture. 1. Stand against wall, feet 6" forward, entire back on wall 2. Roll shoulders back 3. Tuck chin to neck (make double chin), hold 5 seconds 4. Repeat 30 times (5 sets of 6)'
        },
        priority: 5,
        phase: 1,
    },
    {
        id: 'A003',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks', 'jawline'],
        mechanism: 'Sutural Decompression, Maxilla Development',
        name: 'Thumb Pulling Full Routine',
        knowledge: 'Loosens fascia and decompresses cranial sutures so maxilla can respond to tongue pressure. NOT forcing bones apart – creating space.',
        instruction: 'Stand against wall, feet 6" forward, chin tucked. Place thumbs on middle palate. Push upwards/outwards while resisting with chin. Hold 8-12 sec until chin wants to rise, then stop resisting and follow up with thumbs.',
        dos: ['Deep chin tuck', 'Middle, front, and back positions', 'Wait for follow-up'],
        donts: ['Don\'t use extreme force', 'Don\'t thumb pull without tuck', 'Don\'t hold static without follow-up'],
        frequency: 'daily',
        durationMinutes: 3,
        timeOfDay: 'morning',
        tips: 'Hear faint creaking = success.',
        blueprint: {
            howTo: [
                'Stand against a wall, feet 6 inches forward, chin tucked, entire back on the wall.',
                'Place your thumbs on your palate – start at the middle, not on teeth. Push upwards and outwards while simultaneously resisting with your chin (keep it tucked).',
                'Hold for 8–12 seconds until you feel your chin wanting to rise. At that moment, stop resisting with your neck (let your head move back) but maintain the pressure with your thumbs – this “follow‑up” motion releases the suture.',
                'Repeat for 3 minutes, covering the middle, front (behind incisors), and back (before soft palate) positions.'
            ],
            whyItMatters: 'Thumb pulling doesn’t force bones apart; it loosens fascia and decompresses cranial sutures. When the sutures are free, your tongue can remodel the maxilla effectively. The faint creaking sounds you may hear are a good sign – sutures releasing.',
            commonMistakes: 'Safety: If you feel sharp pain, stop. Your thumbs are biologically regulated, so you won’t overdo it. Loosens fascia and decompresses cranial sutures so maxilla can respond to tongue pressure. NOT forcing bones apart – creating space. 1. Stand against wall, feet 6" forward, chin tucked 2. Place thumbs on middle palate (not on teeth) 3. Push upwards and outwards while resisting with chin 4. Hold 8-12 sec until chin wants to rise, then stop resisting with neck and follow up with thumbs 5. Repeat for 3 minutes, covering middle, front, and back palate positions'
        },
        priority: 5,
        phase: 2,
    },
    {
        id: 'A004',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'jawline'],
        mechanism: 'Tongue Mobility',
        name: 'Tongue-tie Stretch',
        knowledge: 'Loosens lingual frenulum for better tongue range, enabling proper mewing. Tongue is second most concentrated place of fascia.',
        instruction: 'Say "T" to place tongue on spot. Push tongue back against finger resistance. Hold 30 seconds, 2 sets.',
        dos: ['70% pressure', 'Consistent hold', 'Say "T" for spot'],
        donts: ['Don\'t push to failure', 'Don\'t cause extreme pain'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Do before tongue chewing.',
        blueprint: {
            howTo: [
                'Say "T" to place your tongue on the T‑spot.',
                'While keeping the tip there, push the rest of your tongue backward against your finger (place your finger horizontally under your chin or against the floor of your mouth).',
                'You should feel a stretch under your tongue, near the frenulum. Hold for 30 seconds, then rest. Repeat for a second set.',
                'Use about 70% of maximum pressure – uncomfortable but not painful.'
            ],
            whyItMatters: 'A tight lingual frenulum (tongue tie) restricts tongue elevation, making proper mewing impossible. This exercise loosens the fascia in the tongue and allows the tongue to rest fully on the palate. It also engages the neck muscles, improving overall posture. Timing: Do this before tongue chewing to maximise effectiveness. Loosens lingual frenulum for better tongue range, enabling proper mewing. Tongue is second most concentrated place of fascia. 1. Say "T" to place tongue on spot 2. Push tongue back against finger resistance 3. Hold 30 seconds, 2 sets',
            
        },
        priority: 4,
        phase: 2,
    },
    {
        id: 'A005',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks', 'jawline'],
        mechanism: 'Tongue Strength',
        name: 'Tongue Chewing (Mastic Gum)',
        knowledge: 'Strengthens genioglossus/styloglossus muscles for stronger suction mewing and better tongue posture.',
        instruction: 'Use mastic gum (no xylitol). Chew slightly, then push gum against T‑spot with tongue tip repeatedly.',
        dos: ['Mastic gum only', 'Push against T-spot'],
        donts: ['Avoid gums with xylitol', 'Don\'t chew with only rear teeth'],
        frequency: 'daily',
        durationMinutes: 10,
        timeOfDay: 'throughout_day',
        tips: 'Trigger: phone pick-up.',
        blueprint: {
            howTo: [
                'Take a piece of natural mastic gum (ensure it’s xylitol‑free). Chew it a few times to soften it.',
                'Then, consciously push the gum against your palate with the tip of your tongue, aiming for the T‑spot.',
                'Continue this pushing motion repeatedly, as if you’re trying to stick the gum to the roof of your mouth. Do this for about 10 minutes total, broken into shorter sessions throughout the day.',
                'Focus on using your tongue, not your jaw, to move the gum.'
            ],
            whyItMatters: 'This strengthens the genioglossus and styloglossus muscles, which are responsible for elevating the tongue. Stronger tongue muscles mean a stronger suction mew and more effective pressure on the maxilla. It also helps develop a proper swallowing pattern.',
            commonMistakes: 'Pro tip: Combine with tongue‑tie stretches for best results. Strengthens genioglossus/styloglossus muscles for stronger suction mewing and better tongue posture. 1. Use mastic gum (no xylitol) 2. Chew slightly, then push gum against T‑spot with tongue tip repeatedly 3. Do while working/idle'
        },
        priority: 4,
        phase: 3,
        fatigueCost: 5,
        recoveryTimeHours: 24,
        muscleGroup: 'neck',
    },
    {
        id: 'A006',
        category: 'active',
        goals: ['hunter_eyes'],
        mechanism: 'Orbicularis Oculi',
        name: 'Eye Resistance Training',
        knowledge: 'Strengthens orbicularis oculi muscle around eyes to hold eyelids taut and more positively tilted. Creates illusion of Hunter eyes.',
        instruction: 'Pull eyelid sideways with finger. Try to close eye against resistance. 3 sets of 20 reps each eye.',
        dos: ['Gentle pull sideways', 'Consistent tension'],
        donts: ['Don\'t raise eyebrows', 'Don\'t squint too hard'],
        frequency: 'daily',
        durationMinutes: 2,
        timeOfDay: 'night',
        tips: 'Do before sleep.',
        blueprint: {
            howTo: [
                'Use your index finger to gently pull the outer corner of one eye sideways (toward your temple).',
                'While pulling, try to close your eye against the resistance. You should feel the orbicularis oculi muscle working.',
                'Perform 20 reps, then switch to the other eye. Complete 3 sets per eye.'
            ],
            whyItMatters: 'This strengthens the muscle around your eye, which can hold the eyelid more taut and create a positive canthal tilt – the illusion of Hunter eyes. It won’t change bone structure, but consistent practice can noticeably improve the eye area.',
            commonMistakes: 'Avoid: Don’t train the frontalis muscle (raising eyebrows) – that creates a “surprised” look and worsens upper eyelid exposure. Strengthens orbicularis oculi muscle around eyes to hold eyelids taut and more positively tilted. Creates illusion of Hunter eyes. 1. Pull eyelid sideways with finger 2. Try to close eye against resistance 3. 3 sets of 20 reps each eye'
        },
        priority: 3,
        phase: 3,
    },
    {
        id: 'A007',
        category: 'active',
        goals: ['hunter_eyes'],
        mechanism: 'Eyebrow Enhancement',
        name: 'Castor Oil Eyebrows',
        knowledge: 'Thick, dark eyebrows create illusion of Hunter eyes and more developed eye area.',
        instruction: 'Apply castor oil or emu oil to eyebrows. Massage gently.',
        dos: ['Organic oil', 'Soft massage'],
        donts: ['Don\'t overpluck'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'night',
        tips: 'Consistent application is key.',
        blueprint: {
            howTo: [
                'Before bed, put a drop of castor oil (or emu oil) on your fingertip.',
                'Gently massage it into your eyebrows, moving in the direction of hair growth.',
                'Leave it on overnight.'
            ],
            whyItMatters: 'Thick, dark eyebrows frame the eyes and create the illusion of a more developed eye area, contributing to the Hunter eyes aesthetic. Castor oil is rich in fatty acids that nourish hair follicles and promote growth. Consistency: Do this nightly – results take weeks to appear. Thick, dark eyebrows create illusion of Hunter eyes and more developed eye area. 1. Apply castor oil or emu oil to eyebrows 2. Massage gently',
            
        },
        priority: 2,
        phase: 3,
    },
    {
        id: 'A008',
        category: 'active',
        goals: ['hunter_eyes', 'grow_taller'],
        mechanism: 'Circadian Rhythm, Hormonal',
        name: 'Morning Sun Exposure',
        knowledge: 'Infrared light at low angles improves eyesight and circadian rhythm. Builds solar callus for better UV tolerance.',
        instruction: 'View sunrise for 30 minutes. Bare feet on earth if possible.',
        dos: ['No sunglasses', 'Direct sky view (no glass)'],
        donts: ['Don\'t stare at intense sun'],
        frequency: 'daily',
        durationMinutes: 30,
        timeOfDay: 'morning',
        tips: 'Builds solar callus.',
        blueprint: {
            howTo: [
                'Within an hour of waking, go outside and face the sun while it’s low in the sky (first 30 minutes after sunrise).',
                'Allow the sunlight to hit your eyes directly – do not wear sunglasses.',
                'Stay out for about 30 minutes, ideally barefoot on grass or soil to also ground yourself.'
            ],
            whyItMatters: 'Morning sunlight is rich in infrared and red light, which penetrate the eyes and stimulate mitochondrial function, improving eyesight and resetting your circadian rhythm. It also helps build a “solar callus” – your skin’s natural protection against UV damage later in the day.',
            commonMistakes: 'Safety: Never stare at the midday sun; only low‑angle sun is safe. Infrared light at low angles improves eyesight and circadian rhythm. Builds solar callus for better UV tolerance. 1. View sunrise for 30 minutes 2. Bare feet on earth if possible'
        },
        priority: 5,
        phase: 1,
    },
    {
        id: 'A009',
        category: 'active',
        goals: ['hunter_eyes'],
        mechanism: 'Circadian Rhythm',
        name: 'Evening Sun Exposure',
        knowledge: 'Sunset light supports melatonin production and fascial relaxation.',
        instruction: 'View sunset for 30 minutes.',
        dos: ['No sunglasses', 'Reflection time'],
        donts: ['Don\'t stare at intense sun'],
        frequency: 'daily',
        durationMinutes: 30,
        timeOfDay: 'throughout_day',
        tips: 'Timed reminder in evening.',
        blueprint: {
            howTo: [
                'Around sunset, go outside and face the sun while it’s low in the sky.',
                'Allow the light to hit your eyes directly for about 30 minutes.'
            ],
            whyItMatters: 'Sunset light signals your brain to produce melatonin, preparing you for sleep. It also provides a different spectrum of light that supports eye health and fascial relaxation.',
            commonMistakes: 'Note: If you can’t do both morning and evening, prioritize morning. Sunset light supports melatonin production and fascial relaxation. 1. View sunset for 30 minutes'
        },
        priority: 3,
        phase: 1,
    },
    {
        id: 'A010',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks'],
        mechanism: 'Fascia Release',
        name: 'Palate Massage',
        knowledge: 'Loosens palatal fascia so sutures can decompress. Prepares for thumb pulling.',
        instruction: 'Stand against wall, chin tucked. Thumbs along palate edges, back to front, firm pressure (8.5/10).',
        dos: ['Deep chin tuck', 'Firm pressure', 'Back to front'],
        donts: ['Don\'t touch soft palate'],
        frequency: 'daily',
        durationMinutes: 2,
        timeOfDay: 'morning',
        tips: 'Preps for thumb pulling.',
        blueprint: {
            howTo: [
                'Stand against a wall with your chin tucked.',
                'Place your thumbs on your palate at the very back (hard palate area, not soft).',
                'Apply firm pressure (about 8.5/10) and slowly drag your thumbs forward along the palate edges, toward the front teeth.',
                'Repeat this back‑and‑forth motion for 1‑2 minutes.'
            ],
            whyItMatters: 'The palate is covered in fascia (anterior‑posterior palatal fascia). Massaging it loosens this fascia, which allows the mid‑palatal suture to decompress more easily during thumb pulling. It also prepares the palate for better tongue contact. Key point: Don’t press on the soft palate (the fleshy part at the back) – only on the hard, bony part. Loosens palatal fascia so sutures can decompress. Prepares for thumb pulling. 1. Stand against wall, chin tucked 2. Thumbs along palate edges, back to front, firm pressure (8.5/10) 3. Repeat for 1-2 minutes',
            
        },
        priority: 3,
        phase: 2,
    },
    {
        id: 'A011',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks'],
        mechanism: 'Fascia Release',
        name: 'Zygo Pulling',
        knowledge: 'Releases tension at zygomatic maxillary suture. Stores lots of epicial fascial tension.',
        instruction: 'Thumbs inside mouth under cheekbones. Massage upwards and outwards until soreness reduces.',
        dos: ['Thumbs inside mouth', 'Massage up/out'],
        donts: ['Don\'t rush'],
        frequency: 'as_needed',
        durationMinutes: 2,
        timeOfDay: 'morning',
        tips: 'Do before cranial work.',
        blueprint: {
            howTo: [
                'Insert your thumbs inside your mouth, positioning them under your cheekbones (the zygomatic arch).',
                'Press upwards and outwards, massaging the area where the zygomatic bone meets the maxilla (the zygomatic maxillary suture).',
                'Continue for 1‑2 minutes, or until you feel the soreness diminish.'
            ],
            whyItMatters: 'The zygomatic maxillary suture is a major site of fascial tension. Releasing it allows the cheekbones to project more outward and upward, and it also helps decompress the entire midface, making thumb pulling more effective. Sensation: It may feel tender at first – that’s normal. As you do it regularly, the tenderness should decrease. Releases tension at zygomatic maxillary suture. Stores lots of epicial fascial tension. 1. Thumbs inside mouth under cheekbones 2. Massage upwards and outwards until soreness reduces',
            
        },
        priority: 3,
        phase: 2,
        fatigueCost: 4,
        recoveryTimeHours: 24,
        muscleGroup: 'fascia',
    },
    {
        id: 'A012',
        category: 'active',
        goals: ['forward_upward'],
        mechanism: 'Full Body Fascia',
        name: 'Cobra Pose',
        knowledge: 'Opens front line and chest before cranial work. Prevents relapse by releasing whole body tension.',
        instruction: 'Lie face down. Press up, open chest. Hold 30-60 seconds with deep breathing.',
        dos: ['Deep breathing', 'Relax shoulders'],
        donts: ['Don\'t strain back'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Part of morning prep.',
        blueprint: {
            howTo: [
                'Lie face down on the floor, legs extended, tops of feet on the floor.',
                'Place your hands under your shoulders, palms flat.',
                'Gently press into your hands to lift your chest off the floor, keeping your pelvis and lower ribs on the ground. Use your back muscles, not arm strength.',
                'Hold for 30‑60 seconds while breathing deeply.'
            ],
            whyItMatters: 'This yoga pose opens the front line of the body – the chest, abdomen, and hip flexors – which are often tight from modern living. Releasing this tension allows the fascia to glide properly and prevents relapse after cranial work. Opens front line and chest before cranial work. Prevents relapse by releasing whole body tension. 1. Lie face down 2. Press up, open chest 3. Hold 30-60 seconds with deep breathing',
            
        },
        priority: 4,
        phase: 2,
    },
    {
        id: 'A013',
        category: 'active',
        goals: ['forward_upward'],
        mechanism: 'Full Body Fascia',
        name: 'Forward Fold',
        knowledge: 'Releases superficial back line. Fascia connects entire body; tension anywhere pulls on skull.',
        instruction: 'Fold forward from hips. Relax neck, let head hang. Hold 30-60 seconds.',
        dos: ['Relax neck', 'Soft knees'],
        donts: ['Don\'t bounce'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Essential for alignment.',
        blueprint: {
            howTo: [
                'Stand with feet hip‑width apart.',
                'Hinge at your hips (not your lower back) and fold forward, letting your head hang heavy.',
                'Bend your knees slightly if needed to protect your lower back.',
                'Hold for 30‑60 seconds, breathing deeply. Feel the stretch along your entire back body – from calves to hamstrings to spine.'
            ],
            whyItMatters: 'This releases the superficial back line, a continuous fascial chain that runs from the soles of your feet to your forehead. When this line is tight, it pulls your whole body down, including your skull. Releasing it allows the cranial sutures to decompress more effectively. Releases superficial back line. Fascia connects entire body; tension anywhere pulls on skull. 1. Fold forward from hips 2. Relax neck, let head hang 3. Hold 30-60 seconds',
            
        },
        priority: 4,
        phase: 1,
    },
    {
        id: 'A014',
        category: 'active',
        goals: ['forward_upward'],
        mechanism: 'Full Body Fascia',
        name: 'Neck/Shoulder Retraction',
        knowledge: 'Corrects forward head posture before cranial work. Aligns deep front line.',
        instruction: 'Pull shoulders back, lengthen neck, look up, hold 10 seconds.',
        dos: ['Shoulders down', 'Neck long'],
        donts: ['Don\'t skip'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Stabilizes base.',
        blueprint: {
            howTo: [
                'Stand or sit tall. Draw your shoulder blades back and down, as if trying to squeeze a pencil between them.',
                'At the same time, lengthen the back of your neck by gently tucking your chin and lifting the crown of your head.',
                'Look slightly upward, keeping your neck long.',
                'Hold for 10 seconds, then release. Repeat several times.'
            ],
            whyItMatters: 'This aligns the deep front line – a fascial chain that connects the tongue, jaw, and neck to the pelvis. When this line is aligned, the head is properly supported and cranial work becomes stable. Corrects forward head posture before cranial work. Aligns deep front line. 1. Pull shoulders back 2. Lengthen neck 3. Look up, hold 10 seconds',
            
        },
        priority: 4,
        phase: 1,
    },
    {
        id: 'A015',
        category: 'active',
        goals: ['forward_upward', 'grow_taller', 'jawline'],
        mechanism: 'Cervical Strength',
        name: 'Neck Curls (Weighted)',
        knowledge: 'Strengthens posterior chain to support head and maintain height gains.',
        instruction: 'Lie off bench edge. Extend neck with or without weight. 3 sets of 10-12 reps.',
        dos: ['Tongue on palate', 'Form first'],
        donts: ['Don\'t use momentum'],
        frequency: '2_3x_weekly',
        durationMinutes: 5,
        timeOfDay: 'morning',
        tips: 'Advanced.',
        blueprint: {
            howTo: [
                'Lie on a bench with your head hanging off the edge. Place a weight plate (or just bodyweight) on your forehead, holding it with your hands to keep it secure.',
                'Slowly curl your neck, bringing your chin toward your chest. Use only your neck muscles – don’t lift your shoulders.',
                'Pause, then lower back down with control.',
                'Do 3 sets of 10‑12 reps. Keep your tongue on the palate throughout.'
            ],
            whyItMatters: 'Strong neck muscles are essential for maintaining good head posture, which directly influences maxillary development. Weighted neck curls also strengthen the posterior chain, contributing to overall height and posture. Progression: Start with bodyweight, then gradually add weight as you get stronger. Strengthens posterior chain to support head and maintain height gains. 1. Lie off bench edge 2. Extend neck with or without weight 3. Keep tongue on palate 4. 3 sets of 10-12 reps',
            
        },
        priority: 3,
        phase: 3,
        fatigueCost: 7,
        recoveryTimeHours: 48,
        muscleGroup: 'neck',
    },
    {
        id: 'A016',
        category: 'active',
        goals: ['hollow_cheeks', 'jawline'],
        mechanism: 'Masseter Activation',
        name: 'Frown While Chewing',
        knowledge: 'Frowning deactivates buccinator muscles (cheek you DON\'T want) and forces masseter engagement.',
        instruction: 'Frown. Bite down and chew. Feel masseters engage.',
        dos: ['Maintain frown', 'Feel masseter pop'],
        donts: ['Don\'t engage buccinators'],
        frequency: 'daily',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Practice during every meal.',
        blueprint: {
            howTo: [
                'As you chew your food (especially tough foods like steak), intentionally frown. This means pulling the corners of your mouth downward.',
                'Feel how this deactivates the buccinator muscles (the ones that puff your cheeks) and forces your masseters to take over.',
                'Maintain this frowning expression throughout the chewing process.'
            ],
            whyItMatters: 'Most people overuse their buccinators when chewing, leading to round, full cheeks rather than defined hollows. By frowning, you engage the masseters – the strongest muscles in the body – and train them to hypertrophy, which adds width to your jaw and creates contrast under your cheekbones. Practice: If you struggle, first practice frowning while biting down without food to build the mind‑muscle connection. Frowning deactivates buccinator muscles (cheek muscles you DON\'T want) and forces masseter engagement. 1. Frown 2. Bite down and chew 3. Feel masseters engage',
            
        },
        priority: 4,
        phase: 3,
    },
    {
        id: 'A017',
        category: 'active',
        goals: ['hollow_cheeks'],
        mechanism: 'Masseter Activation',
        name: 'Front‑Teeth Chewing Practice',
        knowledge: 'Builds mind‑muscle connection with masseters before full chewing.',
        instruction: 'Chew with front teeth only for 2-3 minutes. Learn how masseters feel.',
        dos: ['Focus on sensation', 'Build connection'],
        donts: ['Don\'t rush to full chewing'],
        frequency: 'daily',
        durationMinutes: 3,
        timeOfDay: 'morning',
        tips: 'Pre-meal drill.',
        blueprint: {
            howTo: [
                'Take a small piece of food (or gum) and chew exclusively with your front teeth – incisors – for 2‑3 minutes.',
                'Focus on the sensation in your masseters. You should feel them contracting.',
                'This is a training exercise to build awareness before incorporating the movement into full chewing.'
            ],
            whyItMatters: 'Many people have lost the ability to properly engage their masseters due to a soft‑food diet. This exercise re‑establishes the neural connection, ensuring that when you chew normally, your masseters do the bulk of the work. Transition: Once you can reliably feel your masseters with front‑teeth chewing, start incorporating the frown and forward‑rolling techniques into regular meals. Builds mind‑muscle connection with masseters before full chewing. 1. Chew with front teeth only for 2-3 minutes 2. Learn how masseters feel',
            
        },
        priority: 3,
        phase: 2,
    },
    {
        id: 'A018',
        category: 'active',
        goals: ['hollow_cheeks', 'jawline'],
        mechanism: 'Masseter Activation',
        name: 'Forward Jaw Rolling',
        knowledge: 'Advanced chewing technique for better masseter engagement and mandible development.',
        instruction: 'Bite down. Slowly roll lower jaw forward against back teeth. Feel masseter activation.',
        dos: ['Roll forward', 'Controlled movement'],
        donts: ['Don\'t chew with jaw retracted'],
        frequency: 'daily',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Advanced mastication.',
        blueprint: {
            howTo: [
                'Take a bite of food (or gum) and close your teeth together.',
                'While keeping your teeth in contact, slowly roll your lower jaw forward about 1‑2 millimeters. You’ll feel your lower incisors slide just ahead of your upper incisors.',
                'Then, chew in that slightly protruded position. You should feel a strong contraction in your masseters and less work in your temporalis.',
                'Repeat with each bite.'
            ],
            whyItMatters: 'This advanced chewing technique encourages forward growth of the mandible. By consistently chewing with the jaw slightly forward, you train the muscles and bones to adapt to a more forward position, enhancing your jawline and profile.',
            commonMistakes: 'Note: This takes practice. Start slowly and focus on the feeling. Advanced chewing technique for better masseter engagement and mandible development. 1. Bite down 2. Slowly roll lower jaw forward against back teeth 3. Feel masseter activation'
        },
        priority: 4,
        phase: 3,
        fatigueCost: 6,
        recoveryTimeHours: 24,
        muscleGroup: 'masseters',
    },
    {
        id: 'A019',
        category: 'active',
        goals: ['hollow_cheeks', 'jawline'],
        mechanism: 'Masseter Hypertrophy',
        name: 'Mastic Gum Chewing',
        knowledge: 'Hypertrophies masseters for wider jaw and more defined hollows.',
        instruction: 'Use mastic gum. Chew forward and bilaterally. Equal time both sides. 10-15 min.',
        dos: ['Bilateral chewing', 'Mastic gum only'],
        donts: ['Avoid TMJ strain', 'No sugar gum'],
        frequency: 'daily',
        durationMinutes: 15,
        timeOfDay: 'throughout_day',
        tips: 'Trigger: commute.',
        blueprint: {
            howTo: [
                'Take a piece of mastic gum (or any hard, natural gum) and chew it for 10‑15 minutes daily.',
                'Chew bilaterally – meaning you chew evenly on both sides. Count chews on each side to ensure balance.',
                'Use the frown and forward‑rolling techniques while you chew to maximize masseter engagement.'
            ],
            whyItMatters: 'Mastic gum is much harder than regular gum, providing resistance that stimulates masseter hypertrophy. Larger masseters create a wider, more angular jaw, which enhances the hollow‑cheek illusion and defines the jawline.',
            commonMistakes: 'Caution: Don’t overdo it – chewing for more than 15 minutes a day or using too much force can lead to TMJ issues. Listen to your body. Hypertrophies masseters for wider jaw and more defined hollows. 1. Use mastic gum 2. Chew forward and bilaterally 3. Equal time both sides'
        },
        priority: 4,
        phase: 3,
        fatigueCost: 8,
        recoveryTimeHours: 48,
        muscleGroup: 'masseters',
    },
    {
        id: 'A020',
        category: 'active',
        goals: ['hollow_cheeks'],
        mechanism: 'Buccinator Deactivation',
        name: 'CPS Exercise (Fish Face Pop)',
        knowledge: 'Strengthens orbicularis oris muscle, which creates the hollow contrast. Weak orbicularis oris = no hollows.',
        instruction: 'Suck cheeks in (fish face). Make loudest popping sound possible. 2 sets of 10 reps.',
        dos: ['Loud pop', 'Full fish face'],
        donts: ['Don\'t skip reps'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Morning routine.',
        blueprint: {
            howTo: [
                'Suck your cheeks in as hard as you can, forming a “fish face.” Your lips should be pursed.',
                'Then, forcefully pop your cheeks out, making a loud sound. The goal is to use the orbicularis oris muscle to create the pop, not just air.',
                'Repeat 10 times, rest, then do another set of 10.'
            ],
            whyItMatters: 'This strengthens the orbicularis oris, the muscle that surrounds your mouth. A strong orbicularis oris creates a defined border between your lips and cheeks, which enhances the hollow look. It also improves lip seal, which is essential for proper tongue posture. Where to do it: Anywhere – it’s discreet. Many people do it in the shower. Strengthens orbicularis oris muscle, which creates the hollow contrast. Weak orbicularis oris = no hollows. 1. Suck cheeks in (fish face) 2. Make loudest popping sound possible 3. 2 sets of 10 reps',
            
        },
        priority: 3,
        phase: 1,
    },
    {
        id: 'A021',
        category: 'active',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks'],
        mechanism: 'Zygomaticus Activation',
        name: 'Apply Zygomatic Tape',
        knowledge: 'Creates upward tension on zygomaticus muscles; activates correct muscles subconsciously. Trains SMAS.',
        instruction: 'Apply tape from edge of lips to ears. Sleep on side.',
        dos: ['Clean skin', 'Tension to ears'],
        donts: ['Don\'t sleep on back'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'night',
        tips: 'Use medical tape.',
        blueprint: {
            howTo: [
                'Before bed, take a piece of kinesiology tape (or specialized zygomatic tape) and apply it from the corner of your lips diagonally upward, ending near your ear (following the zygomatic arch).',
                'Ensure the tape is snug but not too tight – it should create a gentle upward pull on your cheeks.',
                'Sleep on your side to maintain the tension.'
            ],
            whyItMatters: 'The tape provides a constant sensory input to your SMAS (superficial muscular aponeurotic system), training your facial muscles to hold a more upward position. Over time, this can lead to permanent changes in muscle tone and even bone adaptation via mechanotransduction. It also encourages nasal breathing during sleep. Combination: Use together with mentalis tape for full‑face results. Creates upward tension on zygomaticus muscles; activates correct muscles subconsciously. Trains SMAS. 1. Apply tape from edge of lips to ears 2. Sleep on side',
            
        },
        priority: 4,
        phase: 3,
    },
    {
        id: 'A022',
        category: 'active',
        goals: ['hollow_cheeks'],
        mechanism: 'Lymphatic Drainage',
        name: 'Big 6 Lymphatic Exercise',
        knowledge: 'Releases interstitial fluid stuck in face. Fluid retention masks hollows even when lean.',
        instruction: 'Activate lymphatic points (clavicle, neck, armpits, etc.) per routine. Combine with sweating.',
        dos: ['Gentle pumping', 'Specific sequence'],
        donts: ['Don\'t push too hard'],
        frequency: '2_3x_weekly',
        durationMinutes: 5,
        timeOfDay: 'morning',
        tips: 'Reduces morning bloat.',
        blueprint: {
            howTo: [
                'Lie down and perform the “Big 6” lymphatic drainage routine (a series of gentle, rhythmic movements that stimulate lymph flow). This typically includes: neck rotations, shoulder shrugs, deep breathing, and light massage of lymph nodes (under jaw, collarbone, armpits, groin).',
                'Spend about 5 minutes on the routine, focusing on areas where you feel puffiness.',
                'Combine with sweating (exercise or sauna) to enhance lymphatic clearance.'
            ],
            whyItMatters: 'The lymphatic system removes interstitial fluid and waste. When it’s sluggish, fluid accumulates in the face, masking bone structure and creating a bloated appearance. The Big 6 routine manually stimulates lymph flow, temporarily reducing facial puffiness.',
            commonMistakes: 'Note: Effects are temporary, so consistency is key for maintaining a lean face. Releases interstitial fluid stuck in face. Fluid retention masks hollows even when lean. 1. Activate lymphatic points per routine 2. Combine with sweating'
        },
        priority: 3,
        phase: 3,
    },
    {
        id: 'A023',
        category: 'active',
        goals: ['hollow_cheeks'],
        mechanism: 'Lymphatic Drainage',
        name: 'Facial Massage (Gua Sha)',
        knowledge: 'Releases interstitial fluid temporarily. Helps sculpt the facial lines.',
        instruction: 'Apply tallow/moisturizer. Thumb from nose bridge to ear along cheekbone.',
        dos: ['Tallow base', 'Nose to ear motion'],
        donts: ['Don\'t expect bone changes'],
        frequency: 'as_needed',
        durationMinutes: 2,
        timeOfDay: 'night',
        tips: 'Use cold stone.',
        blueprint: {
            howTo: [
                'Apply a facial oil or tallow to your skin to reduce friction.',
                'Using your thumb (or a gua sha tool), start at the bridge of your nose and gently stroke outward along your cheekbone, ending near your ear.',
                'Repeat 5‑10 times on each side. You can also massage the jawline and under the chin.',
                'Do this at night, before bed, for a few minutes.'
            ],
            whyItMatters: 'This manual massage encourages lymphatic drainage and temporarily reduces fluid retention, making your cheekbones and jawline more visible. It also relaxes facial muscles and can be very soothing.',
            commonMistakes: 'Note: This is a temporary cosmetic effect, not a bone‑changing habit, but it’s a nice addition to a nightly routine. Releases interstitial fluid temporarily. Same effect as gua sha. 1. Apply tallow/moisturizer 2. Thumb from nose bridge to ear along cheekbone'
        },
        priority: 3,
        phase: 2,
    },
    {
        id: 'A024',
        category: 'active',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Lymphatic Drainage, Fascia Release',
        name: 'Sauna or Hot Bath',
        knowledge: 'Sweating releases interstitial fluid; heat loosens fascia for better bone work.',
        instruction: '10-20 min sauna or hot bath. Exercise to sweat if no access.',
        dos: ['Hydrate well', 'Post-sauna cold rinse'],
        donts: ['Don\'t stay too long'],
        frequency: 'as_needed',
        durationMinutes: 15,
        timeOfDay: 'throughout_day',
        tips: 'Prime time for stretching.',
        blueprint: {
            howTo: [
                'Spend 10‑20 minutes in a sauna or hot bath, allowing yourself to sweat.',
                'If you don’t have access, exercise intensely enough to break a sweat.',
                'Afterward, rinse off and hydrate.'
            ],
            whyItMatters: 'Sweating helps eliminate excess interstitial fluid, reducing facial puffiness. The heat also loosens fascia throughout the body, making cranial work (like thumb pulling) more effective. It’s a passive way to support your active habits. Frequency: 1‑2 times per week is sufficient. Don’t overdo it – extreme heat can be stressful. Sweating releases interstitial fluid; heat loosens fascia for better bone work. 1. 10-20 min sauna or hot bath 2. Exercise to sweat if no access',
            
        },
        priority: 3,
        phase: 3,
        fatigueCost: 6,
        recoveryTimeHours: 24,
        muscleGroup: 'lymphatic',
    },
    {
        id: 'A025',
        category: 'active',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Hormonal (IGF‑1)',
        name: '24h Fast + Sprint Combo',
        knowledge: 'GH and IGF‑1 are antagonistic; need to spike GH first (fasting/sprinting) THEN IGF‑1 (sugars). Maximizes growth axis.',
        instruction: 'Fast 24h. Sprint fasted 6x20 sec. Break fast with high natural sugar meal (honey/fruit).',
        dos: ['Fast 24h', 'Sprint while fasted', 'Sugary refuel'],
        donts: ['Don\'t do short fasts (<24h)', 'Don\'t skip the sprint'],
        frequency: '1x_weekly',
        durationMinutes: 1440,
        timeOfDay: 'throughout_day',
        tips: 'Sunday protocol.',
        blueprint: {
            howTo: [
                'Choose a day (e.g., Sunday) and fast from lunch to lunch (24 hours).',
                'Near the end of the fast (e.g., Sunday morning), perform 6 sets of 20‑second max‑effort sprints with 1 minute rest between sets. Sprint barefoot if possible, with good form.',
                'Immediately after sprinting, break your fast with a meal high in natural sugars (e.g., a bowl of yogurt, fruit, and raw honey). This spikes insulin, which then spikes IGF‑1.'
            ],
            whyItMatters: 'Growth hormone (GH) and IGF‑1 are antagonistic. Fasting and sprinting both spike GH. By consuming sugar right after, you trigger an IGF‑1 surge, maximizing the growth stimulus for bones and tissues. This combination is particularly powerful for height and facial bone growth.',
            commonMistakes: 'Safety: Ensure you’re well‑nourished on non‑fast days. Do not attempt if you have medical conditions. GH and IGF‑1 are antagonistic; need to spike GH first (fasting/sprinting) THEN IGF‑1 (sugars). Maximizes growth axis. 1. Fast 24h (lunch to lunch) 2. Sprint fasted 6x20 sec, 1 min rest 3. Break fast with high natural sugar meal'
        },
        priority: 5,
        phase: 3,
        fatigueCost: 9,
        recoveryTimeHours: 72,
        muscleGroup: 'cns',
    },
    {
        id: 'A026',
        category: 'active',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Hormonal (IGF‑1)',
        name: 'Consume Colostrum',
        knowledge: 'Most bioavailable source of IGF‑1. Supports bone growth.',
        instruction: 'Raw colostrum ideally. Add to yogurt bowl or meal.',
        dos: ['Organic source', 'Cold consume'],
        donts: ['Don\'t overheat', 'Avoid soy additives'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'morning',
        tips: 'Growth factor boost.',
        blueprint: {
            howTo: [
                'Take a tablespoon of raw colostrum (if available) or high‑quality powdered colostrum.',
                'Mix it into a smoothie, yogurt, or simply take it with water.',
                'Do this daily, preferably in the morning or after a workout.'
            ],
            whyItMatters: 'Colostrum is the pre‑milk fluid produced by mammals, and it’s the most bioavailable source of IGF‑1. IGF‑1 is the primary hormone that stimulates bone growth. Regular consumption can support bone density and facial development. Quality: Raw, grass‑fed colostrum is best. If you can’t source it, a reputable powdered brand is a good alternative. Most bioavailable source of IGF‑1. Supports bone growth. 1. Raw colostrum ideally 2. Add to yogurt bowl',
            
        },
        priority: 4,
        phase: 3,
    },
    {
        id: 'A027',
        category: 'active',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Nervous System, Hormonal (DHT)',
        name: 'Grounding Session',
        knowledge: 'Reduces EMF effects, resets nervous system, lowers inflammation.',
        instruction: 'Barefoot on earth (grass, soil, sand) for 10+ minutes. Get sunlight simultaneously.',
        dos: ['Skin to earth', '10+ minutes'],
        donts: ['Don\'t wear shoes'],
        frequency: 'daily',
        durationMinutes: 10,
        timeOfDay: 'throughout_day',
        tips: 'Nature reset.',
        blueprint: {
            howTo: [
                'Find a patch of grass, soil, or sand – ideally in a clean, natural area.',
                'Remove your shoes and socks and stand or walk barefoot for at least 10 minutes.',
                'If possible, also expose your skin to sunlight (e.g., morning sun).'
            ],
            whyItMatters: 'Grounding (or earthing) allows electrons from the earth to flow into your body, neutralizing reactive oxygen species and reducing inflammation. It also helps regulate cortisol and supports hormonal balance, which is essential for bone growth. Plus, it’s a great way to reconnect with nature. Science: There’s a growing body of research showing grounding improves sleep, reduces pain, and lowers stress. Reduces EMF effects, resets nervous system, lowers inflammation. 1. Barefoot on earth (grass, soil, sand) 2. 10+ minutes 3. Get sunlight simultaneously',
            
        },
        priority: 4,
        phase: 1,
    },
    {
        id: 'A028',
        category: 'active',
        goals: ['hollow_cheeks'],
        mechanism: 'Body Composition',
        name: '24h Weekly Fast',
        knowledge: 'Creates weekly caloric deficit without chronic stress. Daily restriction kills hormones.',
        instruction: 'Eat normally 6 days. Fast 24-36h once a week.',
        dos: ['Full nutrient 6 days', 'Water only for fast'],
        donts: ['Don\'t restrict daily calories'],
        frequency: '1x_weekly',
        durationMinutes: 1440,
        timeOfDay: 'throughout_day',
        tips: 'Fat loss without crash.',
        blueprint: {
            howTo: [
                'Choose one day a week (e.g., Sunday) and fast for 24‑36 hours (from dinner to dinner, or lunch to lunch).',
                'On the other six days, eat freely – no calorie counting or restriction.',
                'Stay hydrated with water, herbal tea, or black coffee during the fast.'
            ],
            whyItMatters: 'This creates a weekly calorie deficit without the chronic stress of daily dieting. Daily restriction raises cortisol, which kills testosterone and growth hormone. A single longer fast triggers autophagy, boosts GH, and improves insulin sensitivity – all while allowing you to eat normally the rest of the week. It’s a hormone‑safe way to get leaner and support facial definition.',
            commonMistakes: 'Note: If you’re underweight or have medical issues, consult a professional first. Creates weekly caloric deficit without chronic stress. Daily restriction raises cortisol which kills hormones. 1. Eat as you want 6 days 2. Fast 24-36h one day'
        },
        priority: 5,
        phase: 1,
    },
    {
        id: 'A029',
        category: 'active',
        goals: ['grow_taller'],
        mechanism: 'Pelvic Posture',
        name: 'Back Extensions',
        knowledge: 'Corrects anterior pelvic tilt (APT), which compresses spine and reduces height.',
        instruction: 'Weighted back extensions. 3 sets of 10-15 reps.',
        dos: ['Full range', 'Glute focus'],
        donts: ['Don\'t use momentum'],
        frequency: 'daily',
        durationMinutes: 5,
        timeOfDay: 'morning',
        tips: 'Fixes posture height.',
        blueprint: {
            howTo: [
                'Use a back extension bench or hyperextension bench.',
                'Position yourself so your hips are supported and your upper body can hang down.',
                'With a weight plate held across your chest (or just bodyweight), slowly raise your torso until it’s in line with your legs.',
                'Pause, then lower with control.',
                'Do 3 sets of 10‑15 reps.'
            ],
            whyItMatters: 'Back extensions strengthen the erector spinae and glutes, which are key to correcting anterior pelvic tilt. APT compresses the spine and reduces height; by strengthening the posterior chain, you can restore pelvic alignment and gain back lost inches. Form: Keep your neck neutral – don’t overextend. Corrects anterior pelvic tilt, which compresses spine and reduces height. 1. Weighted back extensions 2. 3 sets of 10-15 reps',
            
        },
        priority: 4,
        phase: 1,
    },
    {
        id: 'A030',
        category: 'active',
        goals: ['grow_taller'],
        mechanism: 'Pelvic Posture',
        name: 'Hip Bridges',
        knowledge: 'Strengthens glutes to correct APT and support a taller frame.',
        instruction: 'Assisted hip bridges/lifts. 3 sets of 15 reps.',
        dos: ['Squeeze glutes', 'Hold peak'],
        donts: ['Don\'t overarch lower back'],
        frequency: 'daily',
        durationMinutes: 3,
        timeOfDay: 'morning',
        tips: 'Glute isolation.',
        blueprint: {
            howTo: [
                'Lie on your back with knees bent, feet flat on the floor, hip‑width apart.',
                'Press through your heels to lift your hips toward the ceiling, squeezing your glutes at the top.',
                'Hold for a second, then lower.',
                'For added difficulty, perform single‑leg bridges or use a weight across your hips.',
                'Do 3 sets of 15 reps.'
            ],
            whyItMatters: 'Weak glutes are a major contributor to anterior pelvic tilt. By strengthening them, you help pull the pelvis into a neutral position, decompressing the spine and improving posture. This can add noticeable height. Mind‑muscle connection: Focus on using your glutes, not your lower back. Strengthens glutes to correct APT. 1. Assisted hip bridges/lifts 2. 3 sets of 15 reps',
            
        },
        priority: 4,
        phase: 1,
    },
    {
        id: 'A031',
        category: 'active',
        goals: ['grow_taller'],
        mechanism: 'Neck Strength',
        name: 'Isometric Neck Holds',
        knowledge: 'Prepares for weighted neck work. Supports spinal alignment.',
        instruction: 'Against wall, 10 seconds each direction (front, back, sides).',
        dos: ['10 sec each side', 'Steady pressure'],
        donts: ['Don\'t strain neck'],
        frequency: 'daily',
        durationMinutes: 2,
        timeOfDay: 'morning',
        tips: 'Foundation for curls.',
        blueprint: {
            howTo: [
                'Stand against a wall or sit with good posture.',
                'Press your head forward against your hand (placed on forehead) and resist for 10 seconds.',
                'Then press backward against your hand (cupped behind head) for 10 seconds.',
                'Repeat for each direction (left, right as well).',
                'Do this daily as a warm‑up before weighted neck work.'
            ],
            whyItMatters: 'Isometrics build a foundation of strength in the neck muscles without stressing the spine. A strong neck supports the head properly, which is essential for maintaining the gains from posture correction and cranial work. Prepares for weighted neck work. 1. Against wall, 10 seconds each direction 2. Progress to neck curls',
            
        },
        priority: 3,
        phase: 1,
    },
    {
        id: 'A032',
        category: 'active',
        goals: ['grow_taller'],
        mechanism: 'Fascia Release',
        name: 'Spike Ball Rolling',
        knowledge: 'Releases adhesions in fascia that pull skeleton down. Increases circulation.',
        instruction: 'Roll thoracic spine, feet, hamstrings, calves, glutes, and back with spike ball.',
        dos: ['Roll feet/spine', 'Find tender spots'],
        donts: ['Don\'t just roll once'],
        frequency: 'daily',
        durationMinutes: 10,
        timeOfDay: 'morning',
        tips: 'Systematic rolling.',
        blueprint: {
            howTo: [
                'Use a spikey massage ball (or tennis ball) and lie on it, targeting specific areas.',
                'Start with your feet: roll the ball under each foot, applying pressure.',
                'Move up to your calves, hamstrings, glutes, and then your thoracic spine (upper back).',
                'For the neck, place the ball against a wall and lean into it, rolling gently.',
                'Spend about 10 minutes total, focusing on any tight spots.'
            ],
            whyItMatters: 'Fascia forms a continuous web throughout your body. When it’s tight, it pulls on your skeleton, compressing your height and distorting posture. Rolling releases these adhesions, allowing your body to lengthen and align. It’s a simple but powerful tool for gaining height. Consistency: Daily rolling yields the best results. Releases adhesions in fascia that pull skeleton down. 1. Roll thoracic spine 2. Feet 3. Hamstrings 4. Calves 5. Glutes 6. Back',
            
        },
        priority: 4,
        phase: 2,
    },
    {
        id: 'A033',
        category: 'active',
        goals: ['grow_taller'],
        mechanism: 'Foot Foundation, Fascia Release',
        name: 'Barefoot Sprinting',
        knowledge: 'Ultimate fascial exercise; works all muscles in unison. Trains proper movement patterns.',
        instruction: '6x20 sec sprints. Nasal breathing only. Flex tendon, knee over toes.',
        dos: ['Barefoot', 'Nasal breathing only'],
        donts: ['Don\'t mouth breathe'],
        frequency: 'as_needed',
        durationMinutes: 5,
        timeOfDay: 'morning',
        tips: 'Athletic potential.',
        blueprint: {
            howTo: [
                'Find a soft, safe surface (grass, track).',
                'Remove your shoes and sprint 6 times for 20 seconds each, with 1 minute rest between sprints.',
                'Focus on form: land on the balls of your feet, keep your knee over your toe, drive your arms, and maintain an upright posture.',
                'Breathe through your nose as much as possible – only use mouth breathing during the final, all‑out effort.'
            ],
            whyItMatters: 'Sprinting barefoot activates the natural spring mechanism of your feet and engages the entire fascial system from toes to head. It strengthens the foot‑glute connection and reinforces proper movement patterns. The explosive nature also spikes growth hormone, supporting height and bone development.',
            commonMistakes: 'Safety: Start gradually; if you’re not used to barefoot running, begin with short strides and soft surfaces. Ultimate fascial exercise; works all muscles in unison. Trains proper movement patterns. 1. Flex tendon, keep knee over toes 2. Head upright, arms in motion 3. Nasal breathing 4. 6x20 sec sprints'
        },
        priority: 4,
        phase: 3,
        fatigueCost: 8,
        recoveryTimeHours: 48,
        muscleGroup: 'cns',
    },
    {
        id: 'A034',
        category: 'active',
        goals: ['jawline'],
        mechanism: 'Mentalis Deactivation',
        name: 'Apply Chin Tape (STTO)',
        knowledge: 'Deactivates overactive mentalis muscle which causes dimpled/pebbled chin.',
        instruction: 'X‑shaped tape on chin before sleep. Use medical tape.',
        dos: ['X-shape', 'Medical tape'],
        donts: ['Don\'t skip'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'night',
        tips: 'Resets chin profile.',
        blueprint: {
            howTo: [
                'Before bed, cut two small strips of kinesiology tape and place them in an “X” shape over your chin, covering the mentalis muscle.',
                'Ensure the tape is secure but not overly tight.',
                'Sleep with it on. In the morning, remove it gently.'
            ],
            whyItMatters: 'The mentalis muscle, when overactive, pulls the chin upward and creates a dimpled “pebbled” appearance. This can make the chin appear recessed. By taping it at night, you prevent unconscious scrunching and train the muscle to relax. Over time, this allows the chin to come forward and the jawline to sharpen. Combine: Use together with zygomatic tape for comprehensive facial taping. Deactivates overactive mentalis muscle which causes dimpled/pebbled chin and can retrude chin. 1. X‑shaped tape on chin 2. Sleep with it on',
            
        },
        priority: 4,
        phase: 3,
    },
    {
        id: 'A035',
        category: 'active',
        goals: ['jawline'],
        mechanism: 'Tongue Posture',
        name: 'T‑spot Pressure Practice',
        knowledge: 'Activates muscles that bring jaw forward. Instant feedback when done right.',
        instruction: 'Say "T" to find spot. Push tongue hard on T‑spot for 5s. Repeat throughout day.',
        dos: ['Push hard', 'Find "T" spot'],
        donts: ['Don\'t push teeth'],
        frequency: 'daily',
        durationMinutes: 1,
        timeOfDay: 'throughout_day',
        tips: 'Jaw advancement drill.',
        blueprint: {
            howTo: [
                'Throughout the day, whenever you think of it, push your tongue firmly against the T‑spot (the spot where your tongue hits when you say “T”).',
                'Hold the pressure for 5 seconds, feeling your jaw subtly advance.',
                'Repeat as many times as you can – aim for 10‑20 times daily.'
            ],
            whyItMatters: 'This simple act trains the muscles that pull the jaw forward. Over time, it can help correct a recessed chin and improve your profile. It also reinforces proper tongue posture and strengthens the neural pathways that keep your jaw in a forward position. Reminder: Use phone alerts or daily activities (like drinking water) as cues. Activates muscles that bring jaw forward. Instant feedback when done right. 1. Say "T" to find spot 2. Push tongue hard on T‑spot 3. Hold 5 seconds, feel jaw advance',
            
        },
        priority: 4,
        phase: 1,
    },

    // CATEGORY C: CONTINUOUS HABITS (Reminders)
    {
        id: 'C001',
        category: 'continuous',
        goals: ['hunter_eyes', 'forward_upward', 'hollow_cheeks', 'jawline'],
        mechanism: 'Tongue Posture',
        name: 'Maintain Suction Mewing',
        knowledge: 'Keep tongue suctioned to palate throughout the day. Your tongue is the natural retainer.',
        instruction: 'Keep tongue suctioned to palate throughout the day. Set hourly phone reminders.',
        dos: ['Hourly check', 'Vacuum seal'],
        donts: ['Don\'t drop tongue'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Hourly reminders.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to remind yourself: Set hourly phone alarms for the first two weeks. Each time the alarm goes off, check your tongue position. If it’s dropped, perform the suction mewing technique (smile, swallow) to reseal it. Over time, this becomes automatic. Your tongue is the natural retainer for all facial changes. If you’re not mewing consistently, any progress from thumb pulling or other exercises will relapse. The goal is to make it a subconscious habit – you should eventually mew without thinking. Keep tongue suctioned to palate throughout the day. Set hourly phone reminders. Your tongue is the natural retainer for all facial changes. Tongue Posture',
            
        },
        priority: 5
    },
    {
        id: 'C002',
        category: 'continuous',
        goals: ['hunter_eyes'],
        mechanism: 'Facial Expression',
        name: 'Avoid Raising Eyebrows',
        knowledge: 'Keep eyebrows relaxed. Overactive frontalis causes upper eyelid exposure.',
        instruction: 'Keep eyebrows relaxed, neutral expression. Check in mirror throughout day.',
        dos: ['Relax forehead'],
        donts: ['Avoid surprise face'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Mirror check.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: Throughout the day, glance in a mirror or use your phone camera to check your expression. If you notice your eyebrows raised, consciously relax them. Practice a neutral, “resting” face. Constantly raising your eyebrows strengthens the frontalis muscle, which pulls the brows up and creates upper eyelid exposure. This makes you look surprised or scared, not fierce. A relaxed brow enhances the Hunter eyes look and prevents forehead wrinkles. Keep eyebrows relaxed, neutral expression. Check in mirror throughout day. Overactive frontalis causes upper eyelid exposure and "scared" look. Facial Expression',
            
        },
        priority: 4
    },
    {
        id: 'C003',
        category: 'continuous',
        goals: ['forward_upward', 'grow_taller', 'jawline'],
        mechanism: 'Nasal Breathing, Nervous System',
        name: 'Backwards Breathing',
        knowledge: 'Breathe silently backwards. 4s in, 6s out. Relaxes fascia.',
        instruction: 'Breathe silently backwards (not up into chest). 4 seconds in, 6 seconds out. Nasal only.',
        dos: ['Horizontal breath', 'Nasal only'],
        donts: ['Chest breathing'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Quiet exhales.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: Several times a day, pause and focus on your breath. Place one hand on your chest and one on your belly. Inhale slowly through your nose, directing the air into your lower belly and back, not into your chest. Your chest should remain still. Exhale through your nose for 6 seconds. Aim for 4‑second inhales, 6‑second exhales. This type of breathing engages the diaphragm, relaxes the fascia, and lowers cortisol. It also promotes proper posture by expanding the rib cage and aligning the spine. Over time, it becomes your default breathing pattern. Breathe silently backwards (not up into chest). 4 seconds in, 6 seconds out. Nasal only. This relaxes fascia and nervous system. Nasal Breathing, Nervous System',
            
        },
        priority: 5
    },
    {
        id: 'C004',
        category: 'continuous',
        goals: ['grow_taller'],
        mechanism: 'Foot Foundation',
        name: 'Walk Correctly',
        knowledge: 'Walk with toes slightly in, heel out, tendon flexed, arch engaged.',
        instruction: 'Walk with toes slightly in, heel out, tendon flexed, arch engaged.',
        dos: ['Engage arches'],
        donts: ['None'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Gait awareness.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: As you walk, focus on your feet. Imagine a line running straight ahead; point your toes slightly inward (pigeon‑toed) rather than outward. As you push off, feel your heel rotate out and your arch engage. Flex the anterior tibial tendon (the tendon on the top of your foot) to activate the foot‑glute connection. Modern footwear has collapsed our arches and ruined our gait. Walking correctly re‑establishes the natural spiral fascial pattern that runs from your toes to your glutes. This improves posture, strengthens your foundation, and can add height by aligning your skeleton. Walk with toes slightly in, heel out, tendon flexed, arch engaged. This activates spiral fascial pattern from toes to glutes. Foot Foundation',
            
        },
        priority: 4
    },
    {
        id: 'C005',
        category: 'continuous',
        goals: ['grow_taller'],
        mechanism: 'Posture',
        name: 'Consistent Posture Work',
        knowledge: 'Maintain good posture throughout day. Chin slightly tucked, shoulders back.',
        instruction: 'Maintain good posture throughout day. Use phone reminders.',
        dos: ['Shoulders back', 'Chin tucked'],
        donts: ['Don\'t slouch'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Posture prompts.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: Set a recurring timer (every 30 minutes) on your phone. When it goes off, quickly scan your posture: are your shoulders rolled forward? Is your chin jutting out? Correct by rolling shoulders back, tucking your chin, and lengthening your spine. Stand against a wall periodically to reset. Posture is not a one‑time fix – it’s a continuous habit. Every time you slouch, you reinforce the patterns that compress your height and misalign your face. Consistent micro‑corrections train your body to maintain good posture automatically. Maintain good posture throughout day. Use phone reminders. Chin slightly tucked, shoulders back, head aligned with spine. Posture',
            
        },
        priority: 5
    },
    {
        id: 'C006',
        category: 'continuous',
        goals: ['jawline'],
        mechanism: 'Tongue Posture',
        name: 'T‑spot Pressure Awareness',
        knowledge: 'Push tongue on T‑spot whenever you remember. Activates muscles that advance the jaw.',
        instruction: 'Push tongue on T‑spot whenever you remember.',
        dos: ['T-spot touch'],
        donts: ['None'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Advanced trigger.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: Associate tongue pressure with everyday triggers: every time you take a sip of water, push your tongue against your T‑spot. Every time you pick up your phone, do the same. Over time, these triggers become automatic. This constant, gentle pressure trains the muscles that advance the jaw. It’s a subtle but powerful way to encourage forward growth and reinforce proper tongue posture. Push tongue on T‑spot whenever you remember. This activates muscles that advance the jaw. Tongue Posture',
            
        },
        priority: 4
    },
    {
        id: 'C007',
        category: 'continuous',
        goals: ['forward_upward', 'jawline'],
        mechanism: 'Nasal Breathing',
        name: 'Constant Nasal Breathing',
        knowledge: 'Breathe through nose only, mouth closed. Filters air and supports maxilla.',
        instruction: 'Breathe through nose only, mouth closed.',
        dos: ['Mouth closed'],
        donts: ['Mouth breathing'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'No mouth breathing.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: Throughout the day, check if your mouth is open. If it is, consciously close it and breathe through your nose. If your nose is congested, address the root cause (e.g., allergies, narrow palate) rather than resorting to mouth breathing. At night, use mouth tape if necessary. Mouth breathing bypasses the nasal filters, reduces nitric oxide, and prevents the tongue from resting on the palate. It’s a primary cause of underdeveloped facial structure. Nasal breathing is essential for maxillary development and overall health. Breathe through nose only, mouth closed. Nasal breathing filters air, increases nitric oxide, and supports maxilla development. Nasal Breathing',
            
        },
        priority: 5
    },
    {
        id: 'C008',
        category: 'continuous',
        goals: ['forward_upward', 'jawline'],
        mechanism: 'Cervical Support',
        name: 'Maintain Chin Tuck Position',
        knowledge: 'Keep chin slightly tucked. Supports cranial base and prevents forward head posture.',
        instruction: 'Keep chin slightly tucked, head aligned with spine.',
        dos: ['Double chin check'],
        donts: ['None'],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Cervical alignment.',
        blueprint: {
            howTo: [
                
            ],
            whyItMatters: 'How to practice: Imagine a string pulling the crown of your head upward while gently tucking your chin. Check your profile in a mirror or use a posture app. When you feel your head drifting forward, tuck it back. Forward head posture is epidemic. It strains the neck, compresses the spine, and pulls the face downward. Maintaining a slight chin tuck keeps the cervical spine aligned and allows the maxilla to develop forward rather than down. Keep chin slightly tucked, head aligned with spine. This supports cranial base and prevents forward head posture. Cervical Support',
            
        },
        priority: 5
    },

    // CATEGORY L: LIFESTYLE PRINCIPLES (Library)
    {
        id: 'L001',
        category: 'lifestyle',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Hormonal Optimization',
        name: 'Reduce Xenoestrogen Exposure',
        knowledge: 'Environmental estrogens disruption.',
        instruction: 'Click to read full article.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Glass > Plastic',
        blueprint: {
            howTo: [
                'Environmental estrogens disrupt hormones, close growth plates, and limit facial development. Phytoestrogens and xenoestrogens mimic estrogen, signaling premature growth plate fusion and reducing DHT.'
            ],
            whyItMatters: 'Why this matters: Modern life is saturated with chemicals that mimic estrogen in the body. These xenoestrogens disrupt your hormonal balance, leading to lower testosterone, higher estrogen, and premature growth plate closure. For facial development, this means less DHT (the hormone that drives masculine bone growth) and more water retention, bloating, and fat storage.\nWhat to do: This isn’t a daily habit but a lifestyle overhaul. Start by replacing all plastic food containers with glass. Switch to natural fiber clothing (cotton, linen, wool) – polyester leaches endocrine disruptors, especially when you sweat. Use natural deodorant and avoid synthetic fragrances in cologne, shampoo, and laundry detergent. Install a shower filter to remove chlorine and other chemicals. Eat organic when possible to avoid pesticide residues. These changes may take time, but every step reduces your estrogenic load.',
            commonMistakes: '1. Replace plastic containers with glass 2. Wear natural fibers (cotton/linen/wool) – polyester leaks into skin when sweaty 3. Use natural deodorant, no synthetic fragrances (cologne, shampoo) 4. Install shower water filter 5. Eat organic when possible 6. Use egg yolk for shampoo'
        },
        priority: 4,
        article: '# Reduce Xenoestrogen Exposure\nEnvironmental estrogens disrupt hormones, close growth plates, and limit facial development.\n\n### Why it matters\nPhytoestrogens and xenoestrogens mimic estrogen, signaling premature growth plate fusion and reducing DHT.\n\n### Action Items\n1. Replace plastic containers with glass\n2. Wear natural fibers (cotton/linen/wool) – polyester leaks into skin when sweaty\n3. Use natural deodorant, no synthetic fragrances (cologne, shampoo)\n4. Install shower water filter\n5. Eat organic when possible\n6. Use egg yolk for shampoo'
    },
    {
        id: 'L002',
        category: 'lifestyle',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Hormonal Optimization',
        name: 'Reduce EMF Exposure',
        knowledge: 'EMF reduces testosterone.',
        instruction: 'Read article.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Airplane mode.',
        blueprint: {
            howTo: [
                'EMF creates reactive oxygen species in Leydig cells, preventing testosterone production. Less T = less DHT = less bone growth.'
            ],
            whyItMatters: 'Why this matters: Electromagnetic fields from phones, WiFi, and other devices create oxidative stress in the body. In the Leydig cells of the testes, this stress impairs testosterone production. Less testosterone means less DHT for bone growth, and higher cortisol, which further suppresses anabolism. Over time, this can stunt facial development and height.\nWhat to do: Grounding is the most effective countermeasure – spend at least 10 minutes a day barefoot on natural earth. Keep your phone away from your body (don’t carry it in your pocket). Turn off WiFi at night. Increase your intake of antioxidants, especially glutathione, found in raw dairy and rare meat. Spend time in nature away from electronic devices. These steps won’t eliminate EMF, but they’ll mitigate the damage.',
            commonMistakes: '1. Ground daily (barefoot on earth) 10+ min 2. Keep phone away from body, use airplane mode at night 3. Turn off WiFi at night 4. Eat glutathione-rich foods (raw dairy, rare meat) 5. Spend time in nature away from devices'
        },
        priority: 4,
        article: '# Reduce EMF Exposure\nEMF creates reactive oxygen species in Leydig cells, preventing testosterone production.\n\n### Why it matters\nLess T = less DHT = less bone growth.\n\n### Action Items\n1. Ground daily (barefoot on earth) 10+ min\n2. Keep phone away from body, use airplane mode at night\n3. Turn off WiFi at night\n4. Eat glutathione-rich foods (raw dairy, rare meat)\n5. Spend time in nature away from devices'
    },
    {
        id: 'L003',
        category: 'lifestyle',
        goals: ['hollow_cheeks'],
        mechanism: 'Fluid Retention',
        name: 'Natural Electrolyte Balance',
        knowledge: 'Sodium/Potassium balance.',
        instruction: 'Read article.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Celtic Salt.',
        blueprint: {
            howTo: [
                'Low‑sodium diets increase aldosterone → more sodium absorption + cortisol. Water retention isn\'t solved by low sodium.'
            ],
            whyItMatters: 'Why this matters: Many people believe that reducing sodium will reduce water retention and bloating. In reality, low sodium intake triggers your body to produce aldosterone, a hormone that increases sodium retention. This leads to more water retention, not less, and also raises cortisol. The key is not to fear salt but to consume it in its natural form (Celtic sea salt, Himalayan salt) alongside plenty of potassium from fruit. A whole‑food diet naturally balances electrolytes without the need for pills or restrictive protocols.\nWhat to do: Stop taking electrolyte tablets. Eat a diet rich in whole foods: meat, fruit, vegetables, and dairy. Use high‑quality salt to taste. Your body knows how to regulate itself when you give it proper nutrients.',
            commonMistakes: '1. Eat whole natural diet 2. Use Celtic sea salt 3. Eat fruit for potassium 4. No electrolyte tablets 5. Trust natural balance'
        },
        priority: 4,
        article: '# Natural Electrolyte Balance\nLow‑sodium diets increase aldosterone → more sodium absorption + cortisol.\n\n### Why it matters\nWater retention isn\'t solved by low sodium.\n\n### Action Items\n1. Eat whole natural diet\n2. Use Celtic sea salt\n3. Eat fruit for potassium\n4. No electrolyte tablets\n5. Trust natural balance'
    },
    {
        id: 'L004',
        category: 'lifestyle',
        goals: ['hollow_cheeks'],
        mechanism: 'Inflammation Control',
        name: 'Gut Health Foundation',
        knowledge: 'Gut issues cause facial bloating.',
        instruction: 'Read article.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Animal-based.',
        blueprint: {
            howTo: [
                'Autoimmune issues and gut inflammation cause facial bloating masking hollows. Leaky gut leads to systemic inflammation.'
            ],
            whyItMatters: 'Why this matters: The gut is central to overall health. When it’s inflamed or leaky, it triggers systemic inflammation, which can cause facial bloating, acne, and poor nutrient absorption. Many people have undiagnosed food sensitivities that keep their faces puffy and their skin unclear. Healing the gut is a prerequisite for hollow cheeks and clear skin.\nWhat to do: Start with an animal‑based diet: meat, fish, eggs, and raw dairy (if you tolerate it). Eliminate processed foods, seed oils, and common irritants like gluten and industrial dairy for a trial period. Identify your personal triggers. Consider fermented foods for microbiome support. Gut healing takes time, but it’s foundational.',
            commonMistakes: '1. Animal‑based diet (meat, fish, eggs, raw dairy if tolerated) 2. Identify trigger foods (dairy, gluten, etc.) 3. Consider elimination diet 4. Eat fermented foods for microbiome'
        },
        priority: 4,
        article: '# Gut Health Foundation\nAutoimmune issues and gut inflammation cause facial bloating masking hollows.\n\n### Why it matters\nLeaky gut leads to systemic inflammation.\n\n### Action Items\n1. Animal‑based diet (meat, fish, eggs, raw dairy if tolerated)\n2. Identify trigger foods (dairy, gluten, etc.)\n3. Consider elimination diet\n4. Eat fermented foods for microbiome'
    },
    {
        id: 'L005',
        category: 'lifestyle',
        goals: ['hollow_cheeks', 'grow_taller'],
        mechanism: 'Hormonal Optimization',
        name: 'Get Lean (Hormone‑Safe)',
        knowledge: 'Body fat increases estrogen.',
        instruction: 'Read article.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Fast, don\'t restrict.',
        blueprint: {
            howTo: [
                'Excess fat tissue is estrogen. More body fat = more estrogen = earlier growth plate closure and reduced DHT.'
            ],
            whyItMatters: 'Why this matters: Fat tissue produces estrogen. The more body fat you carry, the higher your estrogen levels, which can suppress DHT and accelerate growth plate closure. For hollow cheeks, low body fat is essential – but you must achieve it without crashing your hormones. Traditional calorie‑restricted diets raise cortisol and lower testosterone, sabotaging your gains.\nWhat to do: Use a weekly 24‑36 hour fast instead of daily restriction. On fasting days, you get a surge in growth hormone and autophagy; on eating days, you eat freely, keeping your metabolism high and stress low. Combine with resistance training to preserve muscle. This approach leans you out while supporting anabolic hormones.',
            commonMistakes: '1. Maintain healthy weight 2. Use weekly fasting (24-36h) not daily restriction 3. Focus on body composition, not just weight 4. Prioritize protein and nutrient density'
        },
        priority: 4,
        article: '# Get Lean (Hormone‑Safe)\nExcess fat tissue is estrogen.\n\n### Why it matters\nMore body fat = more estrogen = earlier growth plate closure and reduced DHT.\n\n### Action Items\n1. Maintain healthy weight\n2. Use weekly fasting (24-36h) not daily restriction\n3. Focus on body composition, not just weight\n4. Prioritize protein and nutrient density'
    },
    {
        id: 'L006',
        category: 'lifestyle',
        goals: ['grow_taller'],
        mechanism: 'Postural Decompression',
        name: 'Fix Anterior Pelvic Tilt (RSS Protocol)',
        knowledge: 'APT reduces height.',
        instruction: 'Follow RSS protocol.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Daily protocol.',
        blueprint: {
            howTo: [
                'APT compresses spine, reducing height by up to 1-2 inches. Creates excessive lumbar lordosis crushing discs.'
            ],
            whyItMatters: 'Why this matters: Anterior pelvic tilt is one of the most common postural deformities. It occurs when the hip flexors are tight and the glutes and abs are weak. This tilts the pelvis forward, creating an exaggerated curve in the lower back and compressing the spine. The result is a loss of up to two inches of height and a forward‑leaning posture that pulls the head down.\nWhat to do: Follow the RSS method daily:\n- Release: Use a spike ball to roll out the hip flexors, quads, and lower back.\n- Stretch: Perform hip flexor stretches like the kneeling quad stretch, holding for 30‑60 seconds each side.\n- Strengthen: Do glute bridges, hip thrusts, and back extensions to build the posterior chain.\nConsistency is key – this is not a quick fix but a re‑education of your movement patterns.',
            commonMistakes: '1. Release: roll posterior chain with spike ball 2. Stretch: hip flexor stretches (quad stretch, lunges) 3. Strengthen: glute exercises (hip thrusts, back extensions) 4. Perform daily'
        },
        priority: 4,
        article: '# RSS Protocol for APT\nAPT compresses spine, reducing height by up to 1-2 inches.\n\n### Protocol Steps\n1. **Release**: roll posterior chain with spike ball\n2. **Stretch**: hip flexor stretches (quad stretch, lunges)\n3. **Strengthen**: glute exercises (hip thrusts, back extensions)\n4. **Perform daily**'
    },
    {
        id: 'L007',
        category: 'lifestyle',
        goals: ['grow_taller'],
        mechanism: 'Symmetry Repair',
        name: 'Fix Bowleggedness',
        knowledge: 'Symmetry issues reduce height.',
        instruction: 'Read assessment guide.',
        dos: [],
        donts: [],
        frequency: 'continuous',
        durationMinutes: 0,
        timeOfDay: 'throughout_day',
        tips: 'Consult professional.',
        blueprint: {
            howTo: [
                'Bowlegs reduce height and cause asymmetry.'
            ],
            whyItMatters: 'Why this matters: Bowlegs (genu varum) can shorten your effective height and create asymmetry throughout the body. They often result from improper walking patterns, muscle imbalances, or nutritional deficiencies during development. While severe cases may require professional intervention, mild bowleggedness can often be improved with targeted exercises.\nWhat to do: Consult a detailed guide or physical therapist for exercises that strengthen the outer hips and stretch the inner thighs. Focus on walking correctly (toes in, heel out) to retrain your gait. Be patient – structural changes take time.',
            commonMistakes: '1. Consult guide for specific exercises 2. Focus on external hip rotation and strengthening 3. May require professional assessment'
        },
        priority: 4,
        article: '# Fix Bowleggedness\nBowlegs reduce height and cause asymmetry.\n\n### Common Fixes\n1. External hip rotation strengthening\n2. Focused foot arch work\n3. Consistent posture checks\n4. Professional assessment for extreme cases'
    }
];


export const CRANUM_STACKS: BiologicalStack[] = [
    {
        id: 'S001',
        name: 'The Morning Primer',
        description: 'Awaken the fascia and align the cervical spine before any cranial work. Essential foundation.',
        phase: 1,
        timeOfDay: 'morning',
        habitIds: ['A013', 'A014', 'A002', 'A020'] // Forward Fold -> Neck Retract -> Chin Tucks -> CPS
    },
    {
        id: 'S002',
        name: 'The Osteo Unlocking',
        description: 'Release the soft tissue on the palate, then apply gentle sutural tension to expand over time.',
        phase: 2,
        timeOfDay: 'morning',
        habitIds: ['A010', 'A003'] // Palate Massage -> Thumb Pulling
    },
    {
        id: 'S003',
        name: 'Masseter Hypertrophy',
        description: 'Build the mind-muscle connection, then apply heavy resistance to hypertrophy the masseters.',
        phase: 3,
        timeOfDay: 'throughout_day',
        habitIds: ['A017', 'A019'] // Front-Teeth Practice -> Mastic Gum
    },
    {
        id: 'S004',
        name: 'Evening Release',
        description: 'Prepare the face and nervous system for restorative sleep and passive changes.',
        phase: 1,
        timeOfDay: 'night',
        habitIds: ['A023', 'A006'] // Gua Sha -> Eye Resistance
    },
    {
        id: 'S005',
        name: 'Max Growth Spurt',
        description: 'Tax the CNS, spike growth hormone naturally, then recover.',
        phase: 3,
        timeOfDay: 'morning',
        habitIds: ['A033', 'A026'] // Sprints -> Colostrum
    }
];
