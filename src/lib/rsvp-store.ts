import { supabase } from './supabase';

export interface RSVPEntry {
  character_id: string;
  character_nome: string;
  guest_name: string;
  contribution_kind: 'niente' | 'cibo' | 'bevande' | 'sorpresa';
  contribution_detail: string;
  when: number;
}

interface DBRow {
  character_id: string;
  character_nome: string;
  guest_name: string;
  contribution_kind: string;
  contribution_detail: string;
  created_at: string;
}

function rowToEntry(row: DBRow): RSVPEntry {
  return {
    character_id: row.character_id,
    character_nome: row.character_nome,
    guest_name: row.guest_name,
    contribution_kind: row.contribution_kind as RSVPEntry['contribution_kind'],
    contribution_detail: row.contribution_detail || '',
    when: new Date(row.created_at).getTime(),
  };
}

export const RSVPStore = {
  async list(): Promise<RSVPEntry[]> {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: true });
    if (error || !data) return [];
    return data.map(rowToEntry);
  },

  async add(entry: Omit<RSVPEntry, 'when'>): Promise<boolean> {
    const { error } = await supabase.from('rsvps').insert({
      character_id: entry.character_id,
      character_nome: entry.character_nome,
      guest_name: entry.guest_name,
      contribution_kind: entry.contribution_kind,
      contribution_detail: entry.contribution_detail,
    });
    if (error) return false;
    return true;
  },

  async remove(character_id: string) {
    await supabase.from('rsvps').delete().eq('character_id', character_id);
  },

  async clear() {
    await supabase.from('rsvps').delete().neq('character_id', '');
  },

  subscribe(fn: (list: RSVPEntry[]) => void): () => void {
    // Initial fetch
    RSVPStore.list().then(fn);

    // Skip realtime on server
    if (typeof window === 'undefined') return () => {};

    // Use unique channel name to avoid conflicts with React Strict Mode
    const channelName = 'rsvps-' + Math.random().toString(36).slice(2);
    const channel = supabase.channel(channelName);
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'rsvps' }, () => {
      RSVPStore.list().then(fn);
    });
    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },
};
