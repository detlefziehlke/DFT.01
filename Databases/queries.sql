  drop view if exists konto_buchungen_komplett;

  create view konto_buchungen_komplett as
  select

   Buchung.Id as buchung_id,
   Buchung.Datum as datum,
   Buchung.Betrag as betrag,
   Buchung.Memo as memo,

   Konto.Id as konto_id,
   Konto.Name as konto_name,

   coalesce(Empfaenger.Id, 'NO_VALUE') as empfaenger_id,
   coalesce(Empfaenger.Name,'NO_VALUE') as empfaenger_name,

   coalesce(Maincat.Id, 'NO_VALUE' ) as main_categorie_id,
   coalesce(Maincat.Name, 'NO_VALUE' ) as main_categorie_name,
   coalesce(Subcat.Id, 'NO_VALUE' ) as sub_categorie_id,
   coalesce(Subcat.Name, 'NO_VALUE' ) as sub_categorie_name,

   coalesce(Rebooking.Id, -1) as umbuchung_id

  from Buchung
  inner join Konto on Konto.Id = Buchung.KontoId
  left join Empfaenger on Empfaenger.Id = Buchung.EmpfaengerId

  left join Kategorie as Subcat on Subcat.Id = Buchung.KategorieId
  left join Kategorie as Maincat on Maincat.Id = Subcat.ParentId

  left join Buchung as Rebooking on Rebooking.Id = Buchung.GegenbuchungId

;

-- Databases/FinanzDb_Test.db3 < Databases/queries.sql
-- /Users/detlefziehlke/WebstormProjects/DettiFinanceTools/DFT.01/Databases/queries.sql
-- /Databases/queries.sql