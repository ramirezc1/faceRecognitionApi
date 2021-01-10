-- Seed data with a fake user for testing
insert into users (name, email, entries, joined, age, url) values ('test', 't@test.com', 5, '2021-01-01', 26, 'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
insert into login (hash, email) values ('$2a$10$WAK21U0LWl7C//jJ.DOB2uPP1DJQh7KUDgasdyQeGzkop2Pzl8W7u', 't@test.com');

