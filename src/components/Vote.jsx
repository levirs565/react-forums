import PropTypes from "prop-types";
import { AppButtonGroup, AppIconButton, AppIconButtonText } from "./AppButton";
import {
  ArrowUpCircleIcon,
  ArrowUpCircleIconFilled,
} from "../icons/ArrowUpCircleIcon";
import {
  ArrowDownCircleIcon,
  ArrowDownCircleIconFilled,
} from "../icons/ArrowDownCircleIcon";
import "./Vote.css";

export function VoteButtonGroup({
  className,
  upVoteCount,
  downVoteCount,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <AppButtonGroup className={["vote-button-group", className].join(" ")}>
      <AppIconButton
        hasText
        onClick={() => (isUpVoted ? onNeutralizeVote() : onUpVote())}
      >
        {isUpVoted ? <ArrowUpCircleIconFilled /> : <ArrowUpCircleIcon />}
        <AppIconButtonText>{upVoteCount}</AppIconButtonText>
      </AppIconButton>
      <AppIconButton
        hasText
        onClick={() => (isDownVoted ? onNeutralizeVote() : onDownVote())}
      >
        {isDownVoted ? <ArrowDownCircleIconFilled /> : <ArrowDownCircleIcon />}
        <AppIconButtonText>{downVoteCount}</AppIconButtonText>
      </AppIconButton>
    </AppButtonGroup>
  );
}

VoteButtonGroup.propTypes = {
  className: PropTypes.string,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};
