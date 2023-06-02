import BrandAPI from "@api/BrandAPI";
import BrandPostAPI from "@api/BrandPostAPI";
import ItemAPI from "@api/ItemAPI";
import BrandResponse from "@models/brand/BrandResponse";
import BrandPostResponse from "@models/brandpost/BrandPostResponse";
import ItemResponse from "@models/item/ItemResponse";
import SearchIcon from "@mui/icons-material/Search";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import {
	Box,
	CircularProgress,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	InputAdornment,
	InputBase,
	Link,
	List,
	Slide,
	TextField,
	Typography,
	alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import {
	ChangeEvent,
	ReactElement,
	Ref,
	forwardRef,
	useEffect,
	useState,
} from "react";
import SearchResultItem from "./SearchResultItem";

const SearchField = () => {
	const [openSearchResults, setOpenSearchResults] = useState(false);
	const [searchValue, setSearchValue] = useState<string>("");
	const [brandSearchValues, setBrandSearchValues] = useState<BrandResponse[]>(
		[]
	);
	const [brandpostSearchValues, setBrandpostSearchValues] = useState<
		BrandPostResponse[]
	>([]);
	const [itemSearchValues, setItemSearchValues] = useState<ItemResponse[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [open, setOpen] = useState(false);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(event.target.value);

		if (event.target.value) {
			if (!openSearchResults) {
				setOpenSearchResults(true);
			}
		} else {
			setOpenSearchResults(false);
		}
	};

	useEffect(() => {
		if (searchValue && searchValue.length > 0) {
			setIsLoading(true);
			handleBrandSearch(searchValue);
			handleBrandpostSearch(searchValue);
			handleItemSearch(searchValue);
			setTimeout(() => {
				setIsLoading(false);
			}, 150);
		}
	}, [searchValue]);

	const handleBrandSearch = async (query: string) => {
		const response = await BrandAPI.search(query);
		setBrandSearchValues(response);
	};

	const handleBrandpostSearch = async (query: string) => {
		const response = await BrandPostAPI.search(query);
		setBrandpostSearchValues(response);
	};

	const handleItemSearch = async (query: string) => {
		const response = await ItemAPI.search(query);
		setItemSearchValues(response);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSearchValue("");
	};

	return (
		<>
			<Search
				onClick={handleClickOpen}
				style={{
					flex: 1,
					width: "clamp(200px, 70%, 90%)",
					minWidth: "200px",
				}}
			>
				<SearchIconWrapper>
					<SearchIcon sx={{ color: "#222222" }} />
				</SearchIconWrapper>
				<StyledInputBase
					sx={{
						color: "#222222",
						width: "100%",
						fontFamily: "Inter",
					}}
					placeholder="Search…"
					inputProps={{ "aria-label": "search" }}
				/>
			</Search>

			<DialogWrapper
				open={open}
				TransitionComponent={Transition}
				keepMounted
				maxWidth="md"
				fullWidth
				scroll="paper"
				onClose={handleClose}
			>
				<DialogTitleWrapper>
					<TextField
						style={{
							backgroundColor: alpha("#ffffff", 0.8),
							borderRadius: "4px",
						}}
						sx={{
							"&:hover": {
								borderColor: "rgba(0, 0, 0, 0.25)",
							},
						}}
						value={searchValue}
						autoFocus={true}
						onChange={handleSearchChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchTwoToneIcon />
								</InputAdornment>
							),
						}}
						placeholder="Search terms here..."
						fullWidth
						label="Search"
					/>
				</DialogTitleWrapper>
				<Divider />

				{openSearchResults && (
					<DialogContent>
						<Box
							sx={{ pt: 0, pb: 1 }}
							display="flex"
							justifyContent="space-between"
						>
							<Typography variant="body2" component="span">
								Search results for{" "}
								<Typography
									sx={{ fontWeight: "bold" }}
									variant="body1"
									component="span"
								>
									{searchValue}
								</Typography>
							</Typography>
							<Link href="#" variant="body2" underline="hover"></Link>
						</Box>
						<Divider sx={{ mt: 1, mb: 1, borderWidth: "1.5px" }} />
						{isLoading && (
							<CircularProgress
								size={24}
								sx={{
									color: (theme) => alpha(theme.palette.primary.main, 0.5),
									position: "absolute",
									top: "50%",
									left: "50%",
									marginTop: "-12px",
									marginLeft: "-12px",
								}}
							/>
						)}
						<List disablePadding>
							<>
								{!isLoading && brandSearchValues.length > 0 && (
									<>
										{brandSearchValues.splice(0, 4).map((brand, index) => (
											<div key={index} onClick={handleClose}>
												<SearchResultItem
													title={brand.name}
													description={"Lorem ipsum dolor sit amet"}
													path={"/brand/" + brand.id}
												/>
												{index !== 3 && <Divider sx={{ mt: 1, mb: 1 }} />}
											</div>
										))}
									</>
								)}
								{!isLoading && brandpostSearchValues.length > 0 && (
									<>
										<Divider sx={{ mt: 1, mb: 1, borderWidth: "1.5px" }} />
										{brandpostSearchValues
											.splice(0, 4)
											.map((brandpost, index) => (
												<div key={index} onClick={handleClose}>
													<SearchResultItem
														title={brandpost.title}
														description={brandpost.body}
														path={"/brand/" + brandpost.brandId}
													/>
													{index !== 3 && <Divider sx={{ mt: 1, mb: 1 }} />}
												</div>
											))}
									</>
								)}
								{!isLoading && itemSearchValues.length > 0 && (
									<>
										<Divider sx={{ mt: 1, mb: 1, borderWidth: "1.5px" }} />
										{itemSearchValues.splice(0, 4).map((item, index) => (
											<div key={index} onClick={handleClose}>
												<SearchResultItem
													title={item.name}
													description={item.barcode || "No barcode"}
													path={"/brand/" + item.brandId}
												/>
												{index !== 3 && <Divider sx={{ mt: 1, mb: 1 }} />}
											</div>
										))}
									</>
								)}
							</>
						</List>
					</DialogContent>
				)}
			</DialogWrapper>
		</>
	);
};

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children: ReactElement<any, any> },
	ref: Ref<unknown>
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
	() => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
	({ theme }) => `
    background: ${alpha(theme.palette.common.black, 0.1)};
    padding: ${theme.spacing(3)}
`
);

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	// color: "inherit",
	border: "1px solid black",
	borderRadius: "10px",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		// width: '100%',
		[theme.breakpoints.up("md")]: {},
	},
}));

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "10px",
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	// marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "70%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		// width: 'auto',
	},
}));

export default SearchField;
