// Analytics Types
export interface InstanceIdentity {
    instance_id: string;
    created_at: string;
    last_seen_at: string;
    total_sessions: number;
    app_version: string;
}

export interface ActivityEvent {
    event_id: string;
    instance_id: string;
    event_type: EventType;
    timestamp: string;
    session_id: string;
    metadata?: Record<string, any>;
}

export interface Session {
    session_id: string;
    instance_id: string;
    started_at: string;
    ended_at: string | null;
    duration_ms: number | null;
    events_count: number;
}

export enum EventType {
    // Session Events
    SESSION_START = 'session_start',
    SESSION_END = 'session_end',

    // Core Actions
    HABIT_CREATED = 'habit_created',
    HABIT_COMPLETED = 'habit_completed',
    HABIT_DELETED = 'habit_deleted',
    PLAN_TASK_CREATED = 'plan_task_created',
    PLAN_TASK_COMPLETED = 'plan_task_completed',

    // Feature Usage
    STATS_VIEWED = 'stats_viewed',
    MONTHLY_CALENDAR_VIEWED = 'monthly_calendar_viewed',
    PLAN_VIEWED = 'plan_viewed',
    SETTINGS_OPENED = 'settings_opened',
    NOTIFICATIONS_ENABLED = 'notifications_enabled',

    // Data Management
    DATA_EXPORTED = 'data_exported',
    DATA_IMPORTED = 'data_imported',

    // Onboarding
    ONBOARDING_STARTED = 'onboarding_started',
    ONBOARDING_COMPLETED = 'onboarding_completed',
    ONBOARDING_SKIPPED = 'onboarding_skipped',
}
