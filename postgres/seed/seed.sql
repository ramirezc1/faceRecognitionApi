-- Seed data with a fake user for testing

insert into users (name, email, entries, joined) values ('test', 'test@test.com', 5, '2021-01-01');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'test@test.com');

