import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { DrawTree } from "../../utils";

interface MemberProps {
  node: DrawTree;
  w?: number;
  h?: number;
  updateTree?: () => void;
}
const imgLink = [
  "https://randomuser.me/api/portraits/med/men/46.jpg",
  "https://randomuser.me/api/portraits/med/women/81.jpg",
];

const Member: React.FC<MemberProps> = ({ h, node, updateTree }) => {
  return (
    <>
      <Card
        border="1px"
        w={node.member.length * 100}
        height={h}
        zIndex={1}
        position="relative"
        cursor="default"
      >
        <Flex>
          {node.member.map((e, index) => (
            <Center key={`${e},${index}`} w={100}>
              <Card border="none" boxShadow="none" bg="transparent">
                <CardHeader>
                  <Avatar src={imgLink[index]} />
                </CardHeader>
                <CardBody>{e}</CardBody>
              </Card>
            </Center>
          ))}
        </Flex>
        <Menu direction="rtl">
          <MenuButton
            position="absolute"
            left="5%"
            top="0"
            aria-label="Options"
          >
            :
          </MenuButton>
          <MenuList zIndex={99}>
            <MenuItem>New Member</MenuItem>
            {!!node.children.length && !!node.y && (
              <>
                {node.showChild && (
                  <MenuItem
                    onClick={() => {
                      node.showChild = false;
                      updateTree && updateTree();
                    }}
                  >
                    Hidden child
                  </MenuItem>
                )}
                {!node.showChild && (
                  <MenuItem
                    onClick={() => {
                      node.showChild = true;
                      updateTree && updateTree();
                    }}
                  >
                    Show child
                  </MenuItem>
                )}
              </>
            )}
          </MenuList>
        </Menu>
      </Card>
    </>
  );
};

export default Member;
