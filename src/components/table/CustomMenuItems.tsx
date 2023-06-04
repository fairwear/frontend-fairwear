import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import AppTheme from "../../AppTheme";
import './TableComponents.css'

interface ItemProps {
	handleClick: () => void;
	title: string;
	isClicked?: boolean;
}

export interface MenuItemProps extends ItemProps {
	viewingCondition?: () => boolean;
}

interface MenuItemsProps {
	menuItems: MenuItemProps[];
}

const CustomListItem = (props: ItemProps) => {
	const { title, handleClick, isClicked } = props; // deepscan-disable-line
	return (
		<ListItem
			style={{
				padding: "0px",
				backgroundColor: props.isClicked
					? AppTheme.palette.grey["300"]
					: "white",
			}}
		>
			<ListItemButton onClick={() => handleClick()}>
				<Typography
					variant="h5"
					align="center"
					color={AppTheme.palette.text.secondary}
				>
					{props.title}
				</Typography>
			</ListItemButton>
		</ListItem>
	);
};

const MenuItems = ({ menuItems }: MenuItemsProps) => {
	const handleMenuItemMapping = (
		menuItem: MenuItemProps
	): JSX.Element | null => {
		const { viewingCondition = () => true, ...other } = menuItem;
		if (!viewingCondition()) {
			return null;
		} else {
			return <CustomListItem key={other.title} {...other} />;
		}
	};
	return (
		<List
			style={{
				padding: "0px",
			}}
		>
			{menuItems.length > 0 &&
				menuItems.map((menuItem: MenuItemProps) =>
					handleMenuItemMapping(menuItem)
				)}
		</List>
	);
};

export default MenuItems;
