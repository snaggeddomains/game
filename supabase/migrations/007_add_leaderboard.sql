-- Leaderboard players table
create table if not exists public.leaderboard_players (
  id           uuid primary key default gen_random_uuid(),
  display_name text not null,
  email        text not null unique,
  created_at   timestamptz not null default now()
);

alter table public.leaderboard_players enable row level security;

create policy "Allow public read" on public.leaderboard_players
  for select using (true);

-- Add player_id FK to game_results (nullable — anonymous games still allowed)
alter table public.game_results
  add column if not exists player_id uuid references public.leaderboard_players(id) on delete set null;

create index if not exists game_results_player_id_idx on public.game_results (player_id);

-- Leaderboard view: players with 5+ games (50+ answers), ranked by avg accuracy
create or replace view public.leaderboard as
  select
    p.id                                                        as player_id,
    p.display_name,
    count(gr.id)::integer                                       as games_played,
    (count(gr.id) * 10)::integer                               as total_answers,
    round(avg(gr.accuracy)::numeric, 1)                        as avg_accuracy,
    max(gr.score)                                              as best_score,
    max(gr.max_streak)                                         as best_streak,
    row_number() over (order by avg(gr.accuracy) desc, count(gr.id) desc)::integer as rank
  from public.leaderboard_players p
  join public.game_results gr on gr.player_id = p.id
  group by p.id, p.display_name
  having count(gr.id) >= 5
  order by avg_accuracy desc;
