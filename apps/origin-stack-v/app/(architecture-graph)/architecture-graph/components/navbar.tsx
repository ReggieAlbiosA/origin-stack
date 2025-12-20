"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@repo/ui/components/shadcn-ui/input";
import { Button } from "@repo/ui/components/shadcn-ui/button";
import { Route } from "next";
import Link from "next/link";
import {
  HeaderRoot,
  HeaderContainer,
  HeaderLogo,
  HeaderNav,
  HeaderActions,
  HeaderThemeToggle,
  HeaderGitHubLink,
} from "@repo/ui/components/config/header";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <HeaderRoot>
      <HeaderContainer>
        {/* Logo */}
        <HeaderLogo href="/architecture-graph">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          <span className="hidden font-semibold sm:inline-block">
            Architecture Graph
          </span>
        </HeaderLogo>

        {/* Custom Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search diagrams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </form>

        {/* Navigation */}
        <HeaderNav hideOnMobile>
          <Link href={"/architecture-graph/git/merge-squash" as Route}>
            <Button variant="ghost" size="sm">
              Git Diagrams
            </Button>
          </Link>
        </HeaderNav>

        {/* Actions */}
        <HeaderActions>
          <HeaderThemeToggle />
          <HeaderGitHubLink href="https://github.com" />
        </HeaderActions>
      </HeaderContainer>
    </HeaderRoot>
  );
}
