import { createClient } from '@supabase/supabase-js'
import { supabaseConsts } from './constants/supabase'

export const supabase = createClient(supabaseConsts.URL, supabaseConsts.API_KEY)
