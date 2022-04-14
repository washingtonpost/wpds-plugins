/**
 * Token selector is the main way the user will interact and assign tokens in
 * the token tool plugin. It is used to search, select, and inform the users of
 * what is currently assigned for an element.
 */
import React, { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { theme, styled } from "../../stitches.config";
import { Search } from "@washingtonpost/wpds-assets";
import Tokens from "@washingtonpost/wpds-theme/src/wpds.tokens.json";
import Divider from "./divider";
import CommandCenter, {
	FindReference,
	BaseSize,
} from "../Commands/command-center";

//Popover Root
const Root = Popover.Root;

// What triggers the popover to display
const PopoverTrigger = styled(Popover.Trigger, {
	width: 122,
	background: "transparent",
	borderStyle: "solid",
	height: 30,
	display: "grid",
	gridTemplateColumns: "90px 30px", //equals 120 + 2 for borders
	padding: "0px",
	alignItems: "center",
	borderRadius: "2px",

	variants: {
		state: {
			Error: {
				borderColor: "red",
			},
			Warning: {
				borderColor: "orange",
			},
			Default: {
				borderColor: "#F0F0F0",
			},
		},
	},
});

//Current value of selection
const SelectionText = styled("p", {
	width: "80%",
	textAlign: "left",
	paddingLeft: "12px",
	margin: 0,
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	overflowX: "hidden",
});

//Figma Button icon
const ButtonIcon = styled("div", {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	height: "26px",
	width: "28px",
	variants: {
		active: {
			true: {
				backgroundColor: theme.colors.blue,
			},
			false: {
				backgroundColor: "transparent",
				"&:hover": {
					backgroundColor: theme.colors.subtle,
				},
			},
		},
	},
});
//Figma 4 circle icon
const TriggerIcon = ({ isActive }) => {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.5 2C0.5 2.8284 1.1716 3.5 2 3.5C2.8284 3.5 3.5 2.8284 3.5 2C3.5 1.1716 2.8284 0.5 2 0.5C1.1716 0.5 0.5 1.1716 0.5 2Z"
				fill={`${isActive ? "#FFFFFF" : "#333333"}`}
			/>
			<path
				d="M6.5 2C6.5 2.8284 7.1716 3.5 8 3.5C8.8284 3.5 9.5 2.8284 9.5 2C9.5 1.1716 8.8284 0.5 8 0.5C7.1716 0.5 6.5 1.1716 6.5 2Z"
				fill={`${isActive ? "#FFFFFF" : "#333333"}`}
			/>
			<path
				d="M8 9.5C7.1716 9.5 6.5 8.8284 6.5 8C6.5 7.1716 7.1716 6.5 8 6.5C8.8284 6.5 9.5 7.1716 9.5 8C9.5 8.8284 8.8284 9.5 8 9.5Z"
				fill={`${isActive ? "#FFFFFF" : "#333333"}`}
			/>
			<path
				d="M0.5 8C0.5 8.8284 1.1716 9.5 2 9.5C2.8284 9.5 3.5 8.8284 3.5 8C3.5 7.1716 2.8284 6.5 2 6.5C1.1716 6.5 0.5 7.1716 0.5 8Z"
				fill={`${isActive ? "#FFFFFF" : "#333333"}`}
			/>
		</svg>
	);
};
const Icon = styled("div", {
	width: 16,
	height: 30,
	paddingLeft: "$50",
	display: "flex",
	alignItems: "center",
	fill: "$accessible",
	justifyContent: "center",
	transition: "background-color .25s",
	borderStyle: "none",
	backgroundColor: "transparent",
	margin: 0,
});
//content where token data appears
const Content = styled(Popover.Content, {
	backgroundColor: "white",
	fontFamily: "sans-serif",
	borderRadius: "2px",
	width: 160,
	borderColor: theme.colors.subtle,
	borderStyle: "solid",
	borderWidth: "1px",
	boxShadow: "0px 2px 4px 0px rgba(0,0,0,.15)",
	maxHeight: "200px",
	overflow: "hidden",
});
//SearchContainer
const SearchContainer = styled("div", {
	display: "grid",
	gridTemplateColumns: "30px 1fr",
	overflowX: "hidden",
});
//SearchBox
const SearchBox = styled("input", {
	height: 30,
	width: "120px",
	outline: "none",
	borderStyle: "none",
});

//Option scroll container
const OptionContainer = styled("div", {
	maxHeight: "160px",
	overflowY: "auto",
	overflowX: "hidden",
	"&::-webkit-scrollbar": {
		width: "12px",
	},

	"&::-webkit-scrollbar-track": {
		background: "#ffffff",
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "#d6d6d6",
		borderRadius: "10px",
		border: " 3px solid #ffffff",
	},
});

//Option button to select a token
const Option = styled("button", {
	borderStyle: "none",
	zIndex: 100,
	width: "100%",
	fontSize: "12px",
	padding: "8px",
	textAlign: "left",
	backgroundColor: "White",
	color: theme.colors.accessible,
	"&:hover": {
		backgroundColor: theme.colors.subtle,
	},
});

const Helper = styled("span", {
	fontSize: "12px",
	color: "#AAAAAA",
});

export default function TokenSelector({
	tokenPath,
	command,
	state,
	useSearch,
}) {
	const data = {
		dark: {
			value: "true",
		},
		light: {
			value: "false",
		},
	};
	const tokenData = tokenPath == "none" ? data : Tokens[tokenPath];
	console.log(tokenData);
	const [isActive, setIsActive] = useState(false);
	const [Selection, setSelection] = useState("");
	const [Query, setQuery] = useState("");

	useEffect(() => {
		if (Selection) {
			setIsActive(false);
			CommandCenter(command, Selection);
		}
	}, [Selection]);

	function ValueHelper(_tokenName) {
		let _value = Tokens[tokenPath][`${_tokenName}`].value;
		if (typeof _value === "string") {
			if (_value.substring(0, 1) == "{") {
				_value = FindReference(_value.substring(1, _value.length - 1));
			}
			if (_value.includes("rem")) {
				_value = _value.substring(0, _value.length - 3);
				_value = `${BaseSize * parseFloat(_value)}px`;
			}
		}
		return ` / ${_value}`;
	}

	const GetOptions = () => {
		if (!tokenData) return;
		let FilteredOptions = [];
		for (var token in tokenData) {
			if (tokenData[token].hasOwnProperty("value")) {
				if (token.substring(0, Query.length).includes(Query)) {
					FilteredOptions.push({
						name: token,
						data: tokenData[token],
					});
				}
			}
		}

		if (FilteredOptions.length > 0) {
			FilteredOptions.sort((a, b) => {
				if (a.name > b.name) {
					return 1;
				}
				if (b.name > a.name) {
					return -1;
				} else {
					return 0;
				}
			});
			return (
				<OptionContainer>
					{FilteredOptions.map((option, i) => {
						return (
							<Option
								onClick={() => setSelection(option.name)}
								key={i}
							>
								{option.name}
								{tokenPath != "none" && (
									<Helper>{ValueHelper(option.name)}</Helper>
								)}
							</Option>
						);
					})}
				</OptionContainer>
			);
		} else {
			return <Option>Sorry no matches.</Option>;
		}
	};

	return (
		<Root open={isActive} onOpenChange={() => setIsActive(!isActive)}>
			<PopoverTrigger state={state}>
				<SelectionText>{Selection}</SelectionText>
				<ButtonIcon active={isActive}>
					<TriggerIcon isActive={isActive} />
				</ButtonIcon>
			</PopoverTrigger>
			<Content align="end" sideOffset={-2}>
				<SearchContainer css={{ display: useSearch ? "grid" : "none" }}>
					{/* @ts-ignore */}
					<Icon size="100">
						{/* @ts-ignore */}
						<Search />
					</Icon>
					<SearchBox
						autoFocus
						className="search"
						onChange={(e) => setQuery(e.target.value)}
						value={Query}
						placeholder="Search"
						type="text"
					/>
					<Divider css={{ gridColumn: "span 2", margin: "4px 0" }} />
				</SearchContainer>
				<GetOptions />
			</Content>
		</Root>
	);
}
