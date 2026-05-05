alter table public.leaderboard_players rename to game_leaderboard_players;

drop view if exists public.leaderboard;

create or replace view public.game_leaderboard as
  select
    p.id                                                        as player_id,
    p.display_name,
    count(gr.id)::integer                                       as games_played,
    (count(gr.id) * 10)::integer                               as total_answers,
    round(avg(gr.accuracy)::numeric, 1)                        as avg_accuracy,
    max(gr.score)                                              as best_score,
    max(gr.max_streak)                                         as best_streak,
    row_number() over (order by avg(gr.accuracy) desc, count(gr.id) desc)::integer as rank
  from public.game_leaderboard_players p
  join public.game_results gr on gr.player_id = p.id
  group by p.id, p.display_name
  having count(gr.id) >= 5
  order by avg_accuracy desc;
