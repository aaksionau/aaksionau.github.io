---
slug: why-csharp-microsoft-agent-framework
title: "Why I'm Building AI Applications with C# and Microsoft Agent Framework"
authors: [aaksionau]
tags: [csharp, dotnet, ai, microsoft-agent-framework, azure]
date: 2026-06-16
---

Every developer knows the quiet feeling when a tool keeps asking a little more of you than it should. Nothing is broken. Nothing is on fire. You are just writing the same kind of glue again, solving the same small problems by hand, and a question starts forming in the back of your mind: should this really be this hard?

That is where we found ourselves a few months into building with Python.

When we started, we did what most teams do. We reached for Python. It is an easy choice to defend. The tutorials are Python. The SDKs are Python. The examples are Python. And FastAPI really does let you stand up an inference endpoint in an afternoon. So that is what we built, and it felt obvious.

But obvious and right are not always the same thing. A few months in, the gap between them started to show.

## What We Ran Into

None of it was dramatic, and that is almost the point. It was a slow pile-up of small things that were harder than they needed to be. Small things, repeated every day, are the ones that wear you down.

**Dependency injection** was the first. FastAPI has DI, but it is more limited than what .NET gives you. As the app grew, with multiple agents, different data sources, and shared services, wiring everything together took more and more by-hand work and custom scaffolding. In .NET, `IServiceCollection` and constructor injection handle this for you, with lifetimes and scoping built in from the start. You stop thinking about the wiring and start thinking about the work.

**Middleware** was the same story. You can add logging, authentication, and error handling in FastAPI, but the composition model is looser than ASP.NET Core's middleware pipeline. We ended up writing glue code that .NET would have handed us for free.

**Async/await** surprised me the most, so let me slow down here. Python's `asyncio` gives you the syntax, but underneath it is cooperative multitasking on a single-threaded event loop, not real parallelism. The reason is the GIL, the Global Interpreter Lock: only one thread runs Python bytecode at a time.

Picture a kitchen with several cooks but a single knife. It does not matter how many hands you have; only one person can chop at any moment, and everyone else waits their turn. That is the event loop the moment a synchronous call lands in it. One blocking task, and the whole kitchen stops. There is a workaround, `asyncio.run_in_executor()`, which hands the slow work to a thread pool, but it is something you have to remember to reach for every single time.

C# does not have that problem. There is no GIL. Its `async`/`await` sits on top of the ThreadPool, runs across multiple threads for real, and lets the runtime handle the scheduling. Sync and async mix cleanly, and when you need finer control, cancellation tokens and `ConfigureAwait` are right there.

**Database migrations** took more work than I expected. Alembic is the standard tool in the Python and SQLAlchemy world, but setting it up is not trivial. You wire up `alembic.ini`, hand-edit `env.py` to point at your models, and then babysit the auto-generated scripts, which are often wrong or incomplete and need fixing by hand. With EF Core, migrations come down to two commands: `dotnet ef migrations add` and `dotnet ef database update`. It reads your `DbContext` on its own, and the scripts it produces actually hold up. Day to day, that difference adds up more than you would think.

**SQL Server connectivity** caught us off guard. Azure App Service does not ship with the ODBC driver that Python's `pyodbc` and `aioodbc` need to reach MSSQL. So we had to add a startup script and a custom extension just to open a database connection. That is a lot of plumbing for something that should be trivial. In .NET, `Microsoft.Data.SqlClient` is fully managed, has no native dependencies, and simply works on App Service.

**Azure deployment** was the last straw. Pushing a .NET app to App Service is about as plain as it gets: deploy the code, it runs. Getting a Python FastAPI app to the same place without reaching for a container took noticeably more configuration. For a team already living in Azure, .NET was simply the path of least resistance.

## Why I'm Writing This

I am not writing this to tell you Python is wrong. It is not. It is a good language, and there are still places where it is the better choice. I will get to those another time.

You might be thinking this is just preference, the kind of thing developers argue about online and never settle. That is fair. But this is not really about which language wins. It is about the cost of an assumption I never stopped to examine.

We reached for Python because it felt like where the AI world lived. That feeling was not wrong, exactly, but I let it make a decision it should not have made alone, and correcting course in the middle of a project is not free. If you are a .NET developer feeling that same pull, I would rather you see the whole picture before you commit than learn it the way I did.

Writing is also just how I learn. If putting this down helps someone else avoid the same detour, that is a bonus.

## What's Coming

This is the first in a series on my work with C# and the Microsoft Agent Framework:

1. **Building your first AI agent in C#** — setting up Microsoft Agent Framework and wiring your first agent
2. **Creating custom tools for agents** — what tools are, how agents decide to use them, and how to design ones that work reliably
3. **Extending agents with MCP** — what the Model Context Protocol is, how to connect your agent to MCP servers, and when to use MCP over custom tools
4. **Connecting agents to SQL databases** — using a tool to give an agent structured data access, with schema awareness and safe query patterns
5. **Orchestrating multiple specialized agents** — splitting responsibilities across agents and coordinating them
6. **Embeddings and Azure AI Search** — how embeddings work, building a vector index, and wiring semantic search into an agent
7. **Retrieval-Augmented Generation (RAG)** — chunking documents, storing embeddings, and building an agent that answers from your own data
8. **Deploying AI applications to production** — packaging, configuration, monitoring, and the lessons that only show up in prod

Every post will come with working code, and I will keep it practical, closer to "here is what I actually built" than "here is the perfect architecture." If any of this sounds familiar, I think you will find the next one worth your time.

See you there.
