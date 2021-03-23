import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import api from "../services/api";

const apiMock = new MockAdapter(api);

import App from "../App";

describe("App component", () => {
  it("should be able to add new repository", async () => {
    render(<App />);

    apiMock.onGet("repositories").reply(200, []);

    apiMock.onPost("repositories").reply(200, {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    fireEvent.click(screen.getByRole("button", { name: "Adicionar" }));
    
    await waitFor(() => {
      const repositoryList = screen.getByRole("list", { name: "repository-list" });
      expect(repositoryList).toContainElement(screen.getByText("Desafio ReactJS"));
    });
  });

  it("should be able to remove repository", async () => {
    render(<App />);

    apiMock.onGet("repositories").reply(200, [
      {
        id: "123",
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      },
    ]);

    apiMock.onDelete("repositories/123").reply(204);

    await waitFor(() => {
      const repositoryList = screen.getByRole("list", { name: "repository-list" });
      expect(repositoryList).not.toBeEmptyDOMElement();
    });

    fireEvent.click(screen.getByRole("button", { name: "Remover" }));

    await waitFor(() => {
      const repositoryList = screen.getByRole("list", { name: "repository-list" });
      expect(repositoryList).not.toBeEmptyDOMElement();
    });
  });
});
