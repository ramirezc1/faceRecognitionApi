-- Seed data with a fake user for testing

insert into users (name, email, entries, joined, age, url) values ('test', 'test@test.com', 5, '2021-01-01', 26, 'https://www.utoronto.ca/sites/default/files/2017-07-05-faces.jpg');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 'test@test.com');

