  drop view if exists konto_buchungen_komplett;

  create view konto_buchungen_komplett as
  select

   Buchung.Id as buchung_id,
   Buchung.Datum as datum,
   Buchung.Betrag as betrag,
   Buchung.Memo as memo,
   Buchung.Typ as type,

   Konto.Id as konto_id,
   Konto.Name as konto_name,

   coalesce(Empfaenger.Id, 'NO_VALUE') as empfaenger_id,
   coalesce(Empfaenger.Name,'NO_VALUE') as empfaenger_name,

   coalesce(Maincat.Id, 'NO_VALUE' ) as main_categorie_id,
   coalesce(Maincat.Name, 'NO_VALUE' ) as main_categorie_name,
   coalesce(Subcat.Id, 'NO_VALUE' ) as sub_categorie_id,
   coalesce(Subcat.Name, 'NO_VALUE' ) as sub_categorie_name,

   coalesce(Rebooking.Id, -1) as umbuchung_id,
   coalesce(Rebooking.KontoId, -1) as gegenkonto_id,

   coalesce(Gegenkonto.name, -1) as gegenkonto_name,
   coalesce(Infotype.Id, -1) as infotype_id,
   coalesce(Infotype.name, -1) as infotype_name,
   Buchung.Kandidate

  from Buchung
  inner join Konto on Konto.Id = Buchung.KontoId
  left join Empfaenger on Empfaenger.Id = Buchung.EmpfaengerId

  left join Kategorie as Subcat on Subcat.Id = Buchung.KategorieId
  left join Kategorie as Maincat on Maincat.Id = Subcat.ParentId

  left join Buchung as Rebooking on Rebooking.Id = Buchung.GegenbuchungId
  left join Konto as Gegenkonto on Gegenkonto.Id = Rebooking.KontoId
  left join Infotype as Infotype on Infotype.Id = Buchung.InfotypeId

;

-- Ausführen am lokalen Terminal
-- sqlite3 Databases/FinanzDb_Test.db3 < Databases/queries.sql