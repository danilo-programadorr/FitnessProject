import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mbsyokwssibgsosldkkp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ic3lva3dzc2liZ3Nvc2xka2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODkxMDUsImV4cCI6MjA2Mjk2NTEwNX0.KFqdBHKiLCASEubXz_naEN8SxymHf3w3ff1cdY9eCe4'

export const supabase = createClient(supabaseUrl, supabaseKey)