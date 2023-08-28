import React, { useState, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, Stack, Button, Typography } from "@mui/material";

const PokerSim = () => {
  const ranks = [
    { number: "2", rank: 1 }, { number: "3", rank: 2 }, { number: "4", rank: 3 },
    { number: "5", rank: 4 }, { number: "6", rank: 5 }, { number: "7", rank: 6 },
    { number: "8", rank: 7 }, { number: "9", rank: 8 }, { number: "10", rank: 9 },
    { number: "J", rank: 10 }, { number: "Q", rank: 11 }, { number: "K", rank: 12 },
    { number: "A", rank: 13 },
  ];
  const suits = [
    { suitName: "Diamond", suit: "d", }, { suitName: "Club", suit: "c" },
    { suitName: "Heart", suit: "h" }, { suitName: "Spade", suit: "s" }
  ];
  const cardDeck = ranks.flatMap((card) => suits.map((suit) => ({ name: `${card.number}${suit.suit}`, ...card, ...suit, })));

  const [currentDeck, setCurrentDeck] = useState(cardDeck);
  const [shuffled, setShuffled] = useState(false);
  const [players, setPlayers] = useState([
    { name: "Player 1", hand: [] },
    { name: "Player 2", hand: [] }
  ]);
  const [board, setBoard] = useState([]);

  const shuffleCard = useCallback(() => {
    const array = [...currentDeck];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setCurrentDeck(array);
  }, [currentDeck, setCurrentDeck]);

  const burnOneCard = async () => {
    const newArray = [...currentDeck];
    newArray.shift();
    setCurrentDeck(newArray);
  };

  const getCardFromDeck = async () => {
    const topCard = currentDeck[0];
    await burnOneCard();
    return topCard;
  };

  const dealCardToPlayers = async () => {
    let newPlayers = [...players];
    for (let i = 0; i < 2; i++) {
      newPlayers = await Promise.all(newPlayers.map(async (el) => {
        return { ...el, hand: [...el.hand, await getCardFromDeck()] };
      }));
    };
    setPlayers(newPlayers);
  };

  useEffect(() => {
    console.log(currentDeck);
    if (currentDeck.length === 52 && !shuffled) {
      shuffleCard();
      setShuffled(true);
    }
  }, [currentDeck, shuffleCard, shuffled]);

  useEffect(() => {
    console.log(players);
  }, [players]);

  return (
    <div>
      <div>PokerSim</div>
      <div>Player</div>
      <div>Board</div>
      <div>Control</div>
      <Button color="primary" aria-label="refresh" onClick={dealCardToPlayers}>
        Deal Card
      </Button>
      <Button color="primary" aria-label="refresh" onClick={shuffleCard}>
        Shuffle Card
      </Button>
      <Button color="primary" aria-label="refresh" onClick={burnOneCard}>
        Burn
      </Button>
      <div>
        Debug Console
        {currentDeck.map((el) => <div>{el.name},</div>)}
      </div>
    </div>
  );
};

export default PokerSim;